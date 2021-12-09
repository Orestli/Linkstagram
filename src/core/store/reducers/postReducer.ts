import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import postsAPI, {NewPostI, PostCommentsI, PostI} from "../../services/api/postsAPI";
import {AppDispatch} from "../store";
import StatusCode from "../../utils/statusCode";

const initialState = {
    posts: [] as PostI[],
    selectedPost: {} as PostI,
    postComments: [] as PostCommentsI[]
}

const PostReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<PostI[]>) {
            // eslint-disable-next-line no-param-reassign
            state.posts = action.payload
        },
        setCurrentPost(state, action: PayloadAction<PostI>) {
            // eslint-disable-next-line no-param-reassign
            state.selectedPost = action.payload
        },
        setPostComments(state, action: PayloadAction<PostCommentsI[]>) {
            // eslint-disable-next-line no-param-reassign
            state.postComments = action.payload
        },
        like(state, action: PayloadAction<number>) {
            state.posts.map(item => {
                if (item.id === action.payload) {
                    // eslint-disable-next-line no-param-reassign
                    item.is_liked = true
                    // eslint-disable-next-line no-param-reassign
                    item.likes_count += 1

                    return item
                }

                return item
            })
        },
        disLike(state, action: PayloadAction<number>) {
            state.posts.map(item => {
                if (item.id === action.payload) {
                    // eslint-disable-next-line no-param-reassign
                    item.is_liked = false
                    // eslint-disable-next-line no-param-reassign
                    item.likes_count -= 1

                    return item
                }

                return item
            })
        }
    }
})

export const getPosts = (page = 1) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.getAllPosts(page)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.setPosts(response.data))
    }
}

export const getUserPosts = (username: string) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.getUserPosts(username)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.setPosts(response.data))
    }
}

export const getPostComments = (id: number) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.getCommentsById(id)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.setPostComments(response.data))
    }
}

export const getPostById = (id: number) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.getPostById(id)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.setCurrentPost(response.data))
        dispatch(getPostComments(id))
    }
}

export const setLike = (id: number) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.like(id)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.like(id))
    }
}

export const setDislike = (id: number) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.unlike(id)

    if (response.status === StatusCode.success) {
        dispatch(PostReducer.actions.disLike(id))
    }
}

export const leaveComment = (id: number, message: string) => async (dispatch: AppDispatch) => {
    const response = await postsAPI.leaveComment(id, message)

    if (response.status === StatusCode.success) {
        dispatch(getPostComments(id))
    }
}

export const createPost = (data: NewPostI) => async (dispatch: AppDispatch) => {
    console.log(data)

    const response = await postsAPI.createPost(data)

    if (response.status === StatusCode.success) {
        dispatch(getPosts())
    }
}

export default PostReducer.reducer