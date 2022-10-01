import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../Store";
import { DietState } from "../types";

export type DietMetadata = {
    orderId: string,
    name: string,
    from: Date,
    to: Date,
    selected: boolean
}
export const useAllDietMetadata = createSelector(
    (state:RootState) => state.diets,
    (state:DietState) => state.diets.map((diet, idx):DietMetadata => ({
        orderId: diet.orderId,
        name: diet.name,
        from: diet.dates.from,
        to: diet.dates.to,
        selected: state.selectedDietIdx >= 0 && state.selectedDietIdx == idx
    }))
)