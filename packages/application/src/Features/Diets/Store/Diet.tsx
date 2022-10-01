import { createSlice } from "@reduxjs/toolkit";
import { FetchActiveDiets } from "./Actions/FetchActiveDiets";
import { SelectDiet } from "./Actions/SelectDiet";
import { DietState, FetchState } from "./types";


const dietState:DietState = {
    diets: [],
    selectedDietIdx: 0,
    dataState: {
        fetching: FetchState.Fetching
    }
}

export const dietSlice = createSlice({
    name: 'diets',
    initialState: dietState,
    reducers: {},
    extraReducers: (builder) => {
        FetchActiveDiets.bind(builder);
        SelectDiet.bind(builder);
    }
})
