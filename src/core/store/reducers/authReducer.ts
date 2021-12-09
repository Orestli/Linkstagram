import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import authAPI from "../../services/api/authAPI";
import profileAPI from "../../services/api/profileAPI";
import StatusCode from "../../utils/statusCode";
import {AppDispatch} from "../store";

export interface AuthDataI {
    username: string
    login: string
    password: string
    isAuth?: boolean
}

interface ProfileI {
    username: string
    photo: string | null
}

type AuthDataType = AuthDataI & ProfileI

const initialState: AuthDataType = {
    username: '',
    login: '',
    password: '',
    photo: null,
    isAuth: false
}

const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<AuthDataI>) {
            // eslint-disable-next-line no-param-reassign
            state.login = action.payload.login
            // eslint-disable-next-line no-param-reassign
            state.password = action.payload.password
            // eslint-disable-next-line no-param-reassign
            state.isAuth = true
        },
        setProfileData(state, action: PayloadAction<ProfileI>) {
            // eslint-disable-next-line no-param-reassign
            state.username = action.payload.username
            // eslint-disable-next-line no-param-reassign
            state.photo = action.payload.photo
            // eslint-disable-next-line no-param-reassign
            state.isAuth = true
        },
        logout(state) {
            // eslint-disable-next-line no-param-reassign
            state.username = ''
            // eslint-disable-next-line no-param-reassign
            state.login = ''
            // eslint-disable-next-line no-param-reassign
            state.password = ''
            // eslint-disable-next-line no-param-reassign
            state.photo = ''
            // eslint-disable-next-line no-param-reassign
            state.isAuth = false
        }
    }
})

export const getMe = () => async (dispatch: AppDispatch) => {
    const response = await profileAPI.me()

    if (response.status === StatusCode.success) {
        // eslint-disable-next-line camelcase
        const {username, profile_photo_url} = response.data

        dispatch(AuthReducer.actions.setProfileData({
            username,
            photo: profile_photo_url
        }))
    }
}

export const registration = (username: string, login: string, password: string) => async (dispatch: AppDispatch) => {
    const response = await authAPI.registration(username, login, password)

    if (response.status === StatusCode.success) {
        dispatch(AuthReducer.actions.setAuthData({username, login, password}))
    }
}

export const loginUser = (login: string, password: string) => async (dispatch: AppDispatch) => {
    const response = await authAPI.login(login, password)

    if (response.status === StatusCode.success) {
        dispatch(AuthReducer.actions.setAuthData({username: '', login, password}))
        dispatch(getMe())
    }
}

export const {logout} = AuthReducer.actions
export default AuthReducer.reducer