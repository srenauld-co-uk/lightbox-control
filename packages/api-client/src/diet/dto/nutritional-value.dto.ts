import { z } from "zod";

export const nutritionalValueDto = z.object({
  energy: z.number(),
  calories: z.number(),
  fat: z.object({
    total: z.number(),
    saturated: z.number(),
  }),
  carbohydrates: z.object({
    total: z.number(),
    sugar: z.number(),
  }),
  fiber: z.number(),
  protein: z.number(),
  salt: z.number(),
});

export type NutritionalValue = z.infer<typeof nutritionalValueDto>;

export const isNutritionalValue = (r: unknown): r is NutritionalValue => <NutritionalValue>r !== undefined;
export const toNutritionalValue = (r: unknown): NutritionalValue => nutritionalValueDto.parse(r);
