import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../Store";
import { DietState } from "../types";

export const useSelectedDiet = createSelector(
    (state:RootState) => state.diets,
    (state:DietState) => state.selectedDietIdx >= 0 && state.diets[state.selectedDietIdx] ? state.diets[state.selectedDietIdx] : null
)