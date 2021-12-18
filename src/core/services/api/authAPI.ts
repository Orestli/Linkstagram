import instance from "../../utils/instance";

interface AuthI {
    success: string
}

const authAPI = {
    login(login: string, password: string) {
        return instance.post<AuthI>('login', {login, password})
            .then(response => ({
                data: response.data,
                status: response.status,
                authorization: response.headers.authorization
            }))
    },
    registration(username: string, login: string, password: string) {
        return instance.post<AuthI>('create-account', {
            username, login, password
        }).then(response => ({
            data: response.data,
            status: response.status,
            authorization: response.headers.authorization
        }))
    }
}

export default authAPI