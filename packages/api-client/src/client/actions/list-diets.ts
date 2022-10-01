import * as cheerio from "cheerio";
import {
  format, parse, parseISO, Locale,
} from "date-fns";
import DatePolish from "date-fns/locale/pl";
import DateEnglish from "date-fns/locale/en-US";
import { HtmlCore } from "../interfaces/html-core";
import { Diet, dietDto } from "../../diet/dto/diet.dto";
import {
  NutritionalValue,
  nutritionalValueDto,
} from "../../diet/dto/nutritional-value.dto";
import { LightboxLocale } from "../../types";
import { Meal } from "../../diet/dto/meal.dto";
import { Day } from "../../diet/dto/day.dto";

const tryParseDate = (r: string, locale: Locale) => {
  try {
    return parse(`${r} +0000`, "d LLLL (EEEE) xxxx", new Date(), {
      locale,
    });
  } catch (e) {
    return null;
  }
};

const fromNVList = (nvdata: string): NutritionalValue | undefined => {
  const values = nvdata.split(";");
  if (values.length < 10) return undefined;
  return nutritionalValueDto.parse({
    energy: parseFloat(values[1]),
    calories: parseFloat(values[2]),
    fat: {
      total: parseFloat(values[3]),
      saturated: parseFloat(values[4]),
    },
    carbohydrates: {
      total: parseFloat(values[5]),
      sugar: parseFloat(values[6]),
    },
    fiber: parseFloat(values[7]),
    protein: parseFloat(values[8]),
    salt: parseFloat(values[9]),
  });
};

const fetchFlexCourses = async (core: HtmlCore, diet: Diet) => {
  const dietChoicesPage = await core.get(
    `/konto/flex/wybierz-posilki/${diet.orderId}/${diet.calendarId}/1`,
  );
  const dietChoicesElements = cheerio.load(dietChoicesPage.data);
  const days = dietChoicesElements(".flexch__day")
    .toArray()
    .reduce((state, r) => {
      const date = new Date(`${r.attribs["data-date"]}T00:00:00Z`);
      const isPickable = !r.attribs.class
        .split(/\s+/i)
        .includes("flexch__day--inactive");
      const element = cheerio.load(r);
      const meals = element(".flexch-dish .flexch-dish__meals")
        .toArray()
        .map((e) => {
          const mealNumber = e.attribs.id.match(/_([0-9]+)$/i);
          if (!mealNumber || !mealNumber[0]) return null;
          const mealId = parseInt(mealNumber[0][1], 10);
          const mealContainer = cheerio.load(e);
          const options = mealContainer(".flexch-dish__meals__meal")
            .toArray()
            .map((meal) => {
              const selected = meal.attribs.class
                .split(/\s+/i)
                .includes("active");
              const option = meal.attribs["data-abc"];
              const nutritionalValue = fromNVList(meal.attribs["data-nv"]);
              const Item = cheerio
                .load(meal)(".flexch-dish__meals__meal__dish-name span")
                .toArray()
                .slice(1)
                .shift();
              const name = cheerio.load(Item || "").text();
              return {
                option,
                name,
                selected,
                nutritionalValue,
              };
            });
          const selectedMeal = options.filter((meal) => meal.selected).shift();
          return {
            id: mealId,
            options,
            isPickable,
            selectedOption: selectedMeal,
          };
        });
      return state.set(format(date, "uuuu-MM-dd"), {
        date,
        editable: isPickable,
        ordered: true,
        courses: meals.filter(
          (possibleMeal): possibleMeal is Meal => possibleMeal != null,
        ),
      });
    }, new Map<string, Day>());
  return {
    ...diet,
    dates: {
      ...diet.dates,
      activeDays: diet.dates.activeDays.map((r) => {
        const courseOptions = days.get(format(r.date, "uuuu-MM-dd"));
        return {
          ...r,
          editable: courseOptions ? courseOptions.editable : false,
          courses: courseOptions ? courseOptions.courses : [],
        };
      }),
    },
  };
};

const toProductName = (e: cheerio.Element) => {
  const r = cheerio.load(e);
  const matches = r
    .text()
    .trim()
    .match(/(.*) (FLEX)? ([0-9]+) kcal/i);
  if (!matches) return undefined;
  return {
    type: matches[1],
    isFlex: !!matches[2],
    calorieCount: parseInt(matches[3], 10),
  };
};
type DietDates = { start: Date | undefined; end: Date | undefined };

const toDiet = async (
  core: HtmlCore,
  element: cheerio.Element,
  locale: Locale,
): Promise<Diet> => {
  const e = cheerio.load(element);
  const dietProduct = e(".cp-diets__diet__top__c1__product-name")
    .toArray()
    .map(toProductName)[0];
  const dietHash = e(".cp-diets__diet__top__c2 .btn")
    .filter(function checkIfHash() {
      return !!this.attribs["data-diet-hash"];
    })
    .first()
    .attr("data-diet-hash");
  const dietName = e(".cp-diets__diet__top__c1__personalized_name span")
    .text()
    .replace("\n", "")
    .trim();
  const calendarId = element.attribs["data-calendar-id"];
  const dietIdMatch = (dietHash || "").match(
    new RegExp(`cpd-([0-9]+)-${calendarId}-[0-9]+$`, "i"),
  );
  const orderId = (dietIdMatch || [])[1];
  const dates: DietDates = e(
    ".cp-diets__diet__top__c1__d2__start-date, .cp-diets__diet__top__c1__d2__end-date",
  )
    .toArray()
    .reduce(
      (state, dateElement) => {
        const r = tryParseDate(
          cheerio
            .load(dateElement)
            .text()
            .trim()
            .replace(/\s{2,}/gi, " "),
          locale,
        );
        if (!r) return state;
        if (
          dateElement.attribs.class
            .split(/\s+/gi)
            .includes("cp-diets__diet__top__c1__d2__start-date")
        ) {
          return {
            ...state,
            start: r,
          };
        }
        return {
          ...state,
          end: r,
        };
      },
      <DietDates>{
        start: undefined,
        end: undefined,
      },
    );

  if (!dates.start) throw new Error("No start date");
  if (!dates.end) throw new Error("No end date");

  const calendar = e(".calendar__wrapper .day > p")
    .map(function mapCalendarDays() {
      const date = parseISO(`${this.attribs["data-date"]}T00:00:00Z`);
      const classes = this.attribs.class.split(/\s+/gi);
      const hash = this.attribs["data-a-hash"];
      const postcode = this.attribs["data-a-code"];
      const city = this.attribs["data-a-city"];
      const addressTitle = this.attribs.title;
      const canBeChanged = classes.includes("cday");
      const ordered = classes.includes("ordered-day");
      const orderedThings = !ordered
        ? {}
        : {
          address: {
            addressTitle,
            city,
            postcode,
          },
          hash,
          editable: canBeChanged,
        };
      return {
        date,
        ordered,
        ...orderedThings,
      };
    })
    .toArray();

  if (!dietHash) throw new Error("No diethash available");
  const diet = {
    name: dietName,
    product: dietProduct,
    orderId,
    calendarId,
    dietHash,
    dates: {
      from: dates.start,
      to: dates.end,
      activeDays: calendar
        .filter((r) => r.ordered)
        .map((r) => ({
          date: r.date,
          editable: r.editable || false,
          ordered: r.ordered,
          courses: [],
        })),
    },
  };
  if (diet.product?.isFlex) {
    const enhancedDiets = await fetchFlexCourses(core, diet);
    return enhancedDiets;
  }
  return diet;
};

const listDiets = async (core: HtmlCore): Promise<Array<Diet>> => {
  const locale = core.language === LightboxLocale.English ? DateEnglish : DatePolish;
  const accountPage = await core.get("/konto/active-diets-list");
  const doc = cheerio.load(accountPage.data.active_diets_html);
  return Promise.all(
    doc(".cp-diets__diet")
      .toArray()
      .map((e) => toDiet(core, e, locale)),
  );
};

export default listDiets;
