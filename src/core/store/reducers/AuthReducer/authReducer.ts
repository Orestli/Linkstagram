import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {getMe, loginUser, registration} from "./authThunks";

/* eslint-disable no-param-reassign */

export interface AuthData {
    username: string
    login: string
    password: string
    isAuth?: boolean
}

export interface Profile {
    username: string
    // eslint-disable-next-line camelcase
    profile_photo_url: string | null
}

export type initialStateData = AuthData & Profile

const initialState: initialStateData = {
    username: '',
    login: '',
    password: '',
    profile_photo_url: null,
    isAuth: false
}

const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        logout(state) {
            state.username = ''
            state.login = ''
            state.password = ''
            state.profile_photo_url = ''
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.fulfilled.type, (state, action: PayloadAction<Profile>) => {
                state.username = action.payload.username
                state.profile_photo_url = action.payload.profile_photo_url
                state.isAuth = true
            })
            .addCase(registration.fulfilled.type, (state, action: PayloadAction<AuthData>) => {
                state.login = action.payload.login
                state.password = action.payload.password
                state.isAuth = true
            })
            .addCase(loginUser.fulfilled.type, (state, action: PayloadAction<AuthData>) => {
                state.login = action.payload.login
                state.password = action.payload.password
                state.isAuth = true
            })
    }
})

export const {logout} = AuthReducer.actions
export default AuthReducer.reducer