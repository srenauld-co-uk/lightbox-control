import { z } from "zod";
import { nutritionalValueDto } from "./nutritional-value.dto";

export const mealDto = z.object({
  id: z.number(),
  isPickable: z.boolean(),
  selectedOption: z.object({
    option: z.string(),
    name: z.string(),
    selected: z.boolean(),
    nutritionalValue: nutritionalValueDto,
  }),
  options: z.array(
    z.object({
      option: z.string(),
      name: z.string(),
      selected: z.boolean(),
      nutritionalValue: nutritionalValueDto,
    }),
  ),
});

export type Meal = z.infer<typeof mealDto>;

export const isMeal = (r: unknown): r is Meal => <Meal>r !== undefined;

export const toMeal = (r: unknown) => mealDto.parse(r);
