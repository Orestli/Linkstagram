import {createAsyncThunk} from "@reduxjs/toolkit";
import profileAPI from "../../../services/api/profileAPI";
import authAPI from "../../../services/api/authAPI";

export const getMe = createAsyncThunk(
    'auth/getMe',
    async () => {
        const response = await profileAPI.me()

        return response.data
    }
)

export const registration = createAsyncThunk(
    'auth/registration',
    async (data: {username: string, login: string, password: string}) => {
        const response = await authAPI.registration(data.username, data.login, data.password)

        localStorage.clear()
        localStorage.setItem('authorization', String(response.authorization))

        return response.data
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: {login: string, password: string}) => {
        const response = await authAPI.login(data.login, data.password)

        localStorage.clear()
        localStorage.setItem('authorization', String(response.authorization))

        return response.data
    }
)