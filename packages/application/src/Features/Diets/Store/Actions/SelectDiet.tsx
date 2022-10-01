import { ActionReducerMapBuilder, createAction } from "@reduxjs/toolkit";
import { DietState } from "../types";

const SELECT_ACTIVE_DIET_BY_ORDERID = "lightbox/diets/select";

const action = createAction<{ orderId: string }>(SELECT_ACTIVE_DIET_BY_ORDERID);

export const SelectDiet = {
    bind: (builder:ActionReducerMapBuilder<DietState>) => {
        builder.addCase(action, (state, action) => {
            state.selectedDietIdx = state.diets.findIndex(order => order.orderId === action.payload.orderId);
        })
    },
    action
}