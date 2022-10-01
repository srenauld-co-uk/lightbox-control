import { z } from "zod";
import { mealDto } from "./meal.dto";

export const dayDto = z.object({
  date: z.date(),
  ordered: z.boolean(),
  editable: z.boolean(),
  courses: z.array(mealDto),
});

export type Day = z.infer<typeof dayDto>;

export const isDay = (r: unknown): r is Day => <Day>r !== undefined;

export const toDay = (r: unknown): Day => dayDto.parse(r);
