import instance from "../../utils/instance";
import AuthorResponse from "../../../typing/AuthorResponse";
import PhotoPayload from "../../../typing/PhotoPayload";
import {PhotoAttr} from "./profileAPI";

/* eslint-disable camelcase */

export interface PostResponse {
    id: number
    author: AuthorResponse

    comments_count: number
    created_at: string
    description: string
    is_liked: boolean
    likes_count: number
    photos: PhotoPayload[]
}

interface LikeResponse {
    status: number
}

export interface NewPostResponse {
    post: {
        description: string
        photos_attributes: Array<{
            image: PhotoAttr
        }>
    }
}

export interface PostCommentsResponse {
    id: number
    commenter: AuthorResponse
    created_at: string
    message: string
}

const postsAPI =  {
    getAllPosts(page = 1) {
        return instance.get<PostResponse[]>(`posts?${page}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getPostById(id: number) {
        return instance.get<PostResponse>(`posts/${id}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getUserPosts(username: string) {
        return instance.get<PostResponse[]>(`profiles/${username}/posts`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    like(id: number) {
        return instance.post<LikeResponse>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    unlike(id: number) {
        return instance.delete<LikeResponse>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    getCommentsById(id: number) {
        return instance.get<PostCommentsResponse[]>(`posts/${id}/comments`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    leaveComment(id: number, message: string) {
        return instance.post<PostCommentsResponse>(`posts/${id}/comments`, {message})
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    createPost(data: NewPostResponse) {
        return instance.post<PostResponse>('posts', data)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    }
}

export default postsAPI