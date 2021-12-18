import instance from "../../utils/instance";
import AuthorType from "../../../typing/AuthorType";

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

export interface AccountData {
    account: AccountDataPayload
}

export interface AccountDataPayload {
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

const profileAPI = {
    me() {
        return instance.get<AuthorType>('account')
            .then(response => ({
                    data: response.data,
                    status: response.status
                }))
    },
    getProfile(username: string) {
        return instance.get<AuthorType>(`profiles/${username}`)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    },
    editAccount(data: AccountData | AccountDataPayload) {
        return instance.patch<AuthorType>('account', data)
            .then(response => ({
                data: response.data,
                status: response.status
            }))
    }
}

export default profileAPI