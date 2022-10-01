import { z } from "zod";
import { productDto } from "./product.dto";
import { dayDto } from "./day.dto";

export const dietDto = z.object({
  orderId: z.string(),
  product: productDto.optional(),
  calendarId: z.string(),
  dietHash: z.string(),
  name: z.string(),
  dates: z.object({
    from: z.date(),
    to: z.date(),
    activeDays: z.array(dayDto),
  }),
});

export type Diet = z.infer<typeof dietDto>;

export const isDiet = (r: unknown): r is Diet => <Diet>r !== undefined;
export const toDiet = (r: unknown): Diet => dietDto.parse(r);
