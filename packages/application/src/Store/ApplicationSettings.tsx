import { createAction, createAsyncThunk, createSelector, createSlice, current, PrepareAction } from "@reduxjs/toolkit";
import { LightboxClient } from '@mandl-tv/lightbox-client';
import { LightboxLocale } from "@mandl-tv/lightbox-client/dist/types";


type ApplicationSettings = {
    darkModeEnabled: boolean,
    lightboxLanguage: LightboxLocale
}
const appSettingsState:ApplicationSettings = {
    darkModeEnabled: false,
    lightboxLanguage: LightboxLocale.English
}

const LIGHTBOX_SET_SETTINGS = 'lightbox/setSettings';
type SettingsSetType = Pick<ApplicationSettings, "darkModeEnabled" | "lightboxLanguage">;
const action = createAction<Partial<SettingsSetType>>(LIGHTBOX_SET_SETTINGS);

export const settingsSlice = createSlice({
    name: 'appSettings',
    initialState: appSettingsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(action, (state, action) => {

        });
    }
})

export const useCredentials = createSelector((state:any) => state.authentication, (state:AuthState) => state.credentials)
export const useAuthState = createSelector((state:any) => state.authentication, (state:AuthState) => state.state)