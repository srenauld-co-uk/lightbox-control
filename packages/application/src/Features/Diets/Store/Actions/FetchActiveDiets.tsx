import { LightboxClient } from "@mandl-tv/lightbox-client";
import { ActionReducerMapBuilder, createAsyncThunk, current } from "@reduxjs/toolkit";
import { DietState } from "../types";
const FETCH_ACTIVE_DIETS = "lightbox/diets/fetch";

type FetchProps = {
    client: LightboxClient
}

const fetchActiveDiets = createAsyncThunk(FETCH_ACTIVE_DIETS, async ({ client }:FetchProps) => {
    const diets = await client.diets();
    return diets;
})

export const FetchActiveDiets = {
    action: fetchActiveDiets,
    bind: (builder:ActionReducerMapBuilder<DietState>) => {
        builder.addCase(fetchActiveDiets.fulfilled, (state, action) => {
            const now = current(state);
            const newDiets = action.payload;
            const currentDietOrderId = now.selectedDietIdx && now.diets[now.selectedDietIdx] ? now.diets[now.selectedDietIdx].orderId : null;
            const newSelectedOffset = currentDietOrderId ? newDiets.findIndex((r) => r.orderId === currentDietOrderId) : 0;

            state.diets = newDiets;
            state.selectedDietIdx = newSelectedOffset;
        })
        builder.addCase(fetchActiveDiets.pending, (state, action) => {
            
        })
        builder.addCase(fetchActiveDiets.rejected, (state, action) => {
            
        })
    }
};