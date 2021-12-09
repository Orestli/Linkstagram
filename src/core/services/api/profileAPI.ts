import instance from "../../utils/instance";
import AuthorType from "../../utils/models/AuthorType";

export interface AuthorPromiseType {
    data: AuthorType
    status: number
}

export interface PhotoAttr {
    // eslint-disable-next-line camelcase
    id: string
    storage: string
    metadata: {
        filename: string
        size: string | number
        // eslint-disable-next-line camelcase
        mime_type: string
    }
}

export interface AccountDataI {
    account: {
        // eslint-disable-next-line camelcase
        profile_photo?: PhotoAttr
        description?: string | null
        // eslint-disable-next-line camelcase
        first_name?: string | null
        // eslint-disable-next-line camelcase
        last_name?: string | null
        // eslint-disable-next-line camelcase
        job_title?: string | null
    }
}

const profileAPI = {
    me(): Promise<AuthorPromiseType> {
        return instance.get<AuthorType>('account')
            .then(response => ({
                    data: response.data,
                    status: response.status
                }))
    },
    getProfile(username: string): Promise<AuthorPromiseType> {
        return instance.get<AuthorType>(`profiles/${username}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    editAccount(data: AccountDataI): Promise<AuthorPromiseType> {
        return instance.patch<AuthorType>('account', data)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    }
}

export default profileAPI