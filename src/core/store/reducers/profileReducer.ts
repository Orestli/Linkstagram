import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthorType from "../../utils/models/AuthorType";
import {AppDispatch} from "../store";
import profileAPI, {AccountDataI} from "../../services/api/profileAPI";
import StatusCode from "../../utils/statusCode";


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
    reducers: {
        setProfile(state, action: PayloadAction<AuthorType>) {
            // eslint-disable-next-line no-param-reassign
            state.username = action.payload.username
            // eslint-disable-next-line no-param-reassign
            state.description = action.payload.description
            // eslint-disable-next-line no-param-reassign
            state.first_name = action.payload.first_name
            // eslint-disable-next-line no-param-reassign
            state.followers = action.payload.followers
            // eslint-disable-next-line no-param-reassign
            state.following = action.payload.following
            // eslint-disable-next-line no-param-reassign
            state.job_title = action.payload.job_title
            // eslint-disable-next-line no-param-reassign
            state.last_name = action.payload.last_name
            // eslint-disable-next-line no-param-reassign
            state.profile_photo_url = action.payload.profile_photo_url
        },
        setAvatarUrl(state, action: PayloadAction<string>) {
            // eslint-disable-next-line no-param-reassign
            state.profile_photo_url = action.payload
        }
    }
})

export const getProfile = (userName: string) => async (dispatch: AppDispatch) => {
    const response = await profileAPI.getProfile(userName)

    if (response.status === StatusCode.success) {
        // eslint-disable-next-line camelcase
        const {first_name, job_title, last_name, profile_photo_url,
            description, followers, following, username} = response.data

        dispatch(ProfileAPI.actions.setProfile({
            username, description, first_name, followers, following, job_title, last_name, profile_photo_url
        }))
    }
}

export const editAccount = (data: AccountDataI) => async (dispatch: AppDispatch) => {
    const response = await profileAPI.editAccount(data)

    if (response.status === StatusCode.success) {
        // eslint-disable-next-line camelcase
        const {first_name, job_title, last_name, profile_photo_url,
            description, followers, following, username} = response.data

        dispatch(ProfileAPI.actions.setProfile({
            username, description, first_name, followers, following, job_title, last_name, profile_photo_url
        }))
    }
}

export default ProfileAPI.reducer