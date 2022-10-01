import * as cheerio from "cheerio";
import { HtmlCore } from "../interfaces/html-core";
import qs from "querystring";
import { LightboxCredentials, LightboxLocale } from "../../types";
import { z } from "zod";

const resultLogin = z.object({
  error: z.string().optional(),
  url: z.string().optional(),
});

const checkIfSignedIn = async (requestClient: HtmlCore) => {
  const accountPage = await requestClient.get("/konto");
  const doc = cheerio.load(accountPage.data);
  const userIDText = doc("a#top-user-panel-link").text();
  const userID = userIDText.match(/\((.*)\)\s+$/i);
  if (!userID) {
    return {
      page: doc,
    };
  }
  return {
    user: userID[1],
  };
};
export const logIn = async (
  requestClient: HtmlCore,
  credentials: LightboxCredentials,
  locale: LightboxLocale,
) => {
  const { user, page } = await checkIfSignedIn(requestClient);
  if (user && user === credentials.email) {
    return true;
  }
  if (!page) throw new Error("Could not retrieve sign in page");
  const doc = page;
  const form = doc("form#shop-login-form");
  if (!form) throw new Error("Client failed to work");
  const inputFields = doc("form#shop-login-form input").map(function () {
    return {
      name: this.attribs.name,
      value: this.attribs.value,
    };
  });
  const formData: any = {};
  if (
    inputFields.filter(function () {
      return this.name === "client-email";
    })
  ) formData["client-email"] = credentials.email;
  if (
    inputFields.filter(function () {
      return this.name === "client-password";
    })
  ) formData["client-password"] = credentials.password;

  for (const o of inputFields) {
    if (!o.name || !o.value) continue;
    formData[o.name] = o.value;
  }
  formData.lang = locale === LightboxLocale.Polish ? "0" : "1";
  formData.source = "logging_page";

  const result = await requestClient.post(
    "/validateLoginForm",
    qs.stringify({ params: qs.stringify(formData) }),
    {
      baseURL: "https://www.lightbox.pl",
    },
  );
  const parsedOutput = resultLogin.safeParse(result.data);
  if (!parsedOutput.success) throw new Error(parsedOutput.error.message);
  if (parsedOutput.data.url) {
    await requestClient.get(parsedOutput.data.url);
  }
  const { user: afterUser } = await checkIfSignedIn(requestClient);
  if (!afterUser) throw new Error("Log in failed");
  return afterUser;
};
