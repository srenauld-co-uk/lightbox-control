import { createAsyncThunk, createSelector, createSlice, current } from "@reduxjs/toolkit";
import { LightboxClient } from '@srenauld-co-uk/lightbox-client';
export enum State {
    Idle = 'idle',
    Authenticating = 'authenticating',
    Authenticated = 'authenticated',
    Error = 'error'
}
type Credentials = {
    email: string,
    password: string
}
export type AuthIdle = {
    state: State.Idle
}
export type AuthAuthenticating = {
    state: State.Authenticating
}

export type AuthAuthenticated = {
    state: State.Authenticated
}

export type AuthError = {
    state: State.Error,
    error: string
}

type AuthStatus = AuthIdle | AuthAuthenticated | AuthAuthenticating | AuthError;

type AuthState = {
    state: AuthStatus,
    credentials: Credentials
}
const authState:AuthState = {
    state: {
        state: State.Idle
    },
    credentials: {
        email: "",
        password: ""
    }
}

const LIGHTBOX_LOGIN = 'lightbox/login';

type LoginActionProps = {
    credentials: Credentials,
    client: LightboxClient
}
export const loginAction = createAsyncThunk(LIGHTBOX_LOGIN, async ({ client, credentials }:LoginActionProps) => {
    client.setCredentials(credentials);
    await client.logIn();
    return {
        credentials
    }
})

export const authSlice = createSlice({
    name: 'authentication',
    initialState: authState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state:AuthState, action) => {

            console.log(current(state));
            state.state = {
                state: State.Authenticated
            } as AuthAuthenticated;
            state.credentials = action.payload.credentials;
        })
        builder.addCase(loginAction.pending, (state:AuthState) => {
            console.log(current(state));
            state.state = {
                credentials: state.credentials,
                state: State.Authenticating,
            } as AuthAuthenticating;
        })
        builder.addCase(loginAction.rejected, (state:AuthState, error) => {
            state.state = {
                credentials: state.credentials,
                state: State.Error,
                error: error.error.message
            } as AuthError;
        })
    }
})

export const useCredentials = createSelector((state:any) => state.authentication, (state:AuthState) => state.credentials)
export const useAuthState = createSelector((state:any) => state.authentication, (state:AuthState) => state.state)