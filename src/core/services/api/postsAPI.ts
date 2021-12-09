import instance from "../../utils/instance";
import AuthorType from "../../utils/models/AuthorType";
import PhotoType from "../../utils/models/PhotoType";
import {PhotoAttr} from "./profileAPI";

export interface PostI {
    id: number
    author: AuthorType
    // eslint-disable-next-line camelcase
    comments_count: number
    // eslint-disable-next-line camelcase
    created_at: string
    description: string
    // eslint-disable-next-line camelcase
    is_liked: boolean
    // eslint-disable-next-line camelcase
    likes_count: number
    photos: PhotoType[]
}

interface PromiseI<P = PostI[]> {
    data: P
    status: number
}

interface LikeI {
    status: number
}

export interface NewPostI {
    post: {
        description: string
        // eslint-disable-next-line camelcase
        photos_attributes: Array<{
            image: PhotoAttr
        }>
    }
}

export interface PostCommentsI {
    id: number
    commenter: AuthorType
    // eslint-disable-next-line camelcase
    created_at: string
    message: string
}

const postsAPI =  {
    getAllPosts(page = 1): Promise<PromiseI> {
        return instance.get<PostI[]>(`posts?${page}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getPostById(id: number): Promise<PromiseI<PostI>> {
        return instance.get<PostI>(`posts/${id}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    getUserPosts(username = 'Orestlite'): Promise<PromiseI> {
        return instance.get<PostI[]>(`profiles/${username}/posts`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    like(id: number): Promise<LikeI> {
        return instance.post<LikeI>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    unlike(id: number): Promise<LikeI> {
        return instance.delete<LikeI>(`posts/${id}/like`)
            .then(response => ({
                status: response.status
            }))
    },
    getCommentsById(id: number): Promise<PromiseI<PostCommentsI[]>> {
        return instance.get<PostCommentsI[]>(`posts/${id}/comments`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    leaveComment(id: number, message: string): Promise<PromiseI<PostCommentsI>> {
        return instance.post<PostCommentsI>(`posts/${id}/comments`, {message})
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    createPost(data: NewPostI): Promise<PromiseI<PostI>> {
        return instance.post<PostI>('posts', data)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    }
}

export default postsAPI