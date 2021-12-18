import {createAsyncThunk} from "@reduxjs/toolkit";
import profileAPI, {AccountData, AccountDataPayload} from "../../../services/api/profileAPI";

/* eslint-disable import/prefer-default-export */

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (userName: string) => {
        const response = await profileAPI.getProfile(userName)

        return response.data
    }
)

export const editAccount = createAsyncThunk(
    'profile/editAccount',
    async (data: AccountData | AccountDataPayload) => {
        const response = await profileAPI.editAccount(data)

        return response.data
    }
)