import {createAsyncThunk} from "@reduxjs/toolkit";
import postsAPI, {NewPostResponse} from "../../../services/api/postsAPI";

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (page: number) => {
        const response = await postsAPI.getAllPosts(page)

        return response.data
    }
)

export const getUserPosts = createAsyncThunk(
    'post/getUserPosts',
    async (username: string) => {
        const response = await postsAPI.getUserPosts(username)

        return response.data
    }
)

export const getPostComments = createAsyncThunk(
    'post/getPostComments',
    async (id: number) => {
        const response = await postsAPI.getCommentsById(id)

        return response.data
    }
)

export const getPostById = createAsyncThunk(
    'post/getPostById',
    async (id: number, {dispatch}) => {
        const response = await postsAPI.getPostById(id)

        dispatch(getPostComments(id))

        return response.data
    }
)

export const setLike = createAsyncThunk(
    'post/setLike',
    async (id: number) => {
        await postsAPI.like(id)

        return id
    }
)

export const setDislike = createAsyncThunk(
    'post/setDislike',
    async (id: number) => {
        await postsAPI.unlike(id)

        return id
    }
)

export const leaveComment = createAsyncThunk(
    'post/leaveComment',
    async (data: {id: number, message: string}, {dispatch}) => {
        const response = await postsAPI.leaveComment(data.id, data.message)

        dispatch(getPostComments(data.id))

        return response.data
    }
)

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data: NewPostResponse) => {
        const response = await postsAPI.createPost(data)

        return response.data
    }
)