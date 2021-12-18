import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PostCommentsI, PostI} from "../../../services/api/postsAPI";
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
    posts: PostI[]
    selectedPost: PostI
    postComments: PostCommentsI[]
}

const initialState: InitialStateData = {
    posts: [],
    selectedPost: {} as PostI,
    postComments: [] as PostCommentsI[]
}

const PostReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {},
    extraReducers: {
        [getPosts.fulfilled.type]: (state, action: PayloadAction<PostI[]>) => {
            state.posts = action.payload
        },
        [getUserPosts.fulfilled.type]: (state, action: PayloadAction<PostI[]>) => {
            state.posts = action.payload
        },
        [getPostComments.fulfilled.type]: (state, action: PayloadAction<PostCommentsI[]>) => {
            state.postComments = action.payload
        },
        [getPostById.fulfilled.type]: (state, action: PayloadAction<PostI>) => {
            state.selectedPost = action.payload
        },
        [setLike.fulfilled.type]: (state, action: PayloadAction<number>) => {
            state.posts.map(item => {
                if (item.id === action.payload) {
                    item.is_liked = true
                    item.likes_count += 1

                    return item
                }

                return item
            })

            if (Object.keys(state.selectedPost).length !== 0) {
                state.selectedPost.likes_count += 1
                state.selectedPost.is_liked = true
            }
        },
        [setDislike.fulfilled.type]: (state, action: PayloadAction<number>) => {
            state.posts.map((item) => {
                if (item.id === action.payload) {
                    item.is_liked = false
                    item.likes_count -= 1

                    return item
                }

                return item
            })

            if (Object.keys(state.selectedPost).length !== 0) {
                state.selectedPost.likes_count -= 1
                state.selectedPost.is_liked = false
            }
        },
        [leaveComment.fulfilled.type]: (state, action: PayloadAction<PostCommentsI>) => {
            state.postComments.push(action.payload)
        },
        [createPost.fulfilled.type]: (state, action: PayloadAction<PostI>) => {
            state.posts.push(action.payload)
        }
    }
})

export default PostReducer.reducer