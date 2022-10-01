import { z } from "zod";

export const productDto = z.object({
  calorieCount: z.number(),
  type: z.string(),
  isFlex: z.boolean().default(false),
});

export type Product = z.infer<typeof productDto>;

export const isProduct = (r: unknown) => <Product>r !== undefined;

export const toProduct = (r: unknown) => productDto.parse(r);
