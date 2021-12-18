import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import AuthorType from "../../../../typing/AuthorType";
import {editAccount, getProfile} from "./profileThunks";

/* eslint-disable no-param-reassign */

const initialState: AuthorType = {
    username: '',
    description: null,
    first_name: null,
    followers: 0,
    following: 0,
    job_title: null,
    last_name: null,
    profile_photo_url: null
}

const ProfileAPI = createSlice({
    name: 'profileAPI',
    initialState,
    reducers: {},
    extraReducers: {
        [getProfile.fulfilled.type]: (state, action: PayloadAction<AuthorType>) => {
            state.username = action.payload.username
            state.description = action.payload.description
            state.first_name = action.payload.first_name
            state.followers = action.payload.followers
            state.following = action.payload.following
            state.job_title = action.payload.job_title
            state.last_name = action.payload.last_name
            state.profile_photo_url = action.payload.profile_photo_url
        },
        [editAccount.fulfilled.type]: (state, action: PayloadAction<AuthorType>) => {
            state.username = action.payload.username
            state.description = action.payload.description
            state.first_name = action.payload.first_name
            state.followers = action.payload.followers
            state.following = action.payload.following
            state.job_title = action.payload.job_title
            state.last_name = action.payload.last_name
            state.profile_photo_url = action.payload.profile_photo_url
        }
    }
})

export default ProfileAPI.reducer