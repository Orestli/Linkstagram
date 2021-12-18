import instance from "../../utils/instance";
import AuthorType from "../../../typing/AuthorType";
import PhotoType from "../../../typing/PhotoType";
import {PhotoAttr} from "./profileAPI";

/* eslint-disable camelcase */

export interface PostI {
    id: number
    author: AuthorType

    comments_count: number
    created_at: string
    description: string
    is_liked: boolean
    likes_count: number
    photos: PhotoType[]
}

interface LikeI {
    status: number
}

export interface NewPostI {
    post: {
        description: string
        photos_attributes: Array<{
            image: PhotoAttr
        }>
    }
}

export interface PostCommentsI {
    id: number
    commenter: AuthorType
    created_at: string
    message: string
}

const postsAPI =  {
    getAllPosts(page = 1) {
        return instance.get<PostI[]>(`posts?${page}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getPostById(id: number) {
        return instance.get<PostI>(`posts/${id}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getUserPosts(username: string) {
        return instance.get<PostI[]>(`profiles/${username}/posts`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    like(id: number) {
        return instance.post<LikeI>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    unlike(id: number) {
        return instance.delete<LikeI>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    getCommentsById(id: number) {
        return instance.get<PostCommentsI[]>(`posts/${id}/comments`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    leaveComment(id: number, message: string) {
        return instance.post<PostCommentsI>(`posts/${id}/comments`, {message})
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    createPost(data: NewPostI) {
        return instance.post<PostI>('posts', data)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    }
}

export default postsAPI