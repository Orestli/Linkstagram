import instance from "../../utils/instance";

interface AuthPromiseI {
    data: {
        success: string
    }
    status: number
}

interface AuthI {
    success: string
}

const authAPI = {
    login(login: string, password: string): Promise<AuthPromiseI> {
        return instance.post<AuthI>('login', {login, password})
            .then(response => ({
                    data: response.data,
                    status: response.status
                }))
    },
    registration(username: string, login: string, password: string): Promise<AuthPromiseI> {
        return instance.post<AuthI>('create-account', {
            username, login, password
        }).then(response => ({
            data: response.data,
            status: response.status
        }))
    }
}

export default authAPI