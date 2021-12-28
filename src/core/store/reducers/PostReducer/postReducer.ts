import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PostCommentsResponse, PostResponse} from "../../../services/api/postsAPI";
import {
    createPost,
    getPostById,
    getPostComments,
    getPosts,
    getUserPosts,
    leaveComment,
    setDislike,
    setLike
} from "./postThunks";

/* eslint-disable no-param-reassign */

export interface InitialStateData {
    posts: PostResponse[]
    selectedPost: PostResponse | null
    postComments: PostCommentsResponse[]
}

const initialState: InitialStateData = {
    posts: [],
    selectedPost: null,
    postComments: [] as PostCommentsResponse[]
}

const PostReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPosts.fulfilled.type, (state, action: PayloadAction<PostResponse[]>) => {
                state.posts = action.payload
            })
            .addCase(getUserPosts.fulfilled.type, (state, action: PayloadAction<PostResponse[]>) => {
                state.posts = action.payload
            })
            .addCase(getPostComments.fulfilled.type, (state, action: PayloadAction<PostCommentsResponse[]>) => {
                state.postComments = action.payload
            })
            .addCase(getPostById.fulfilled.type, (state, action: PayloadAction<PostResponse>) => {
                state.selectedPost = action.payload
            })
            .addCase(setLike.fulfilled.type, (state, action: PayloadAction<number>) => {
                state.posts.map(item => {
                    if (item.id === action.payload) {
                        item.is_liked = true
                        item.likes_count += 1

                        return item
                    }

                    return item
                })

                if (state.selectedPost && Object.keys(state.selectedPost).length !== 0) {
                    state.selectedPost.likes_count += 1
                    state.selectedPost.is_liked = true
                }
            })
            .addCase(setDislike.fulfilled.type, (state, action: PayloadAction<number>) => {
                state.posts.map((item) => {
                    if (item.id === action.payload) {
                        item.is_liked = false
                        item.likes_count -= 1

                        return item
                    }

                    return item
                })

                if (state.selectedPost && Object.keys(state.selectedPost).length !== 0) {
                    state.selectedPost.likes_count -= 1
                    state.selectedPost.is_liked = false
                }
            })
            .addCase(leaveComment.fulfilled.type, (state, action: PayloadAction<PostCommentsResponse>) => {
                state.postComments.push(action.payload)
            })
            .addCase(createPost.fulfilled.type, (state, action: PayloadAction<PostResponse>) => {
                state.posts.push(action.payload)
            })
    }
})

export default PostReducer.reducer