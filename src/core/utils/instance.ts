import axios from "axios";

const instance = axios.create({
    baseURL: 'https://linkstagram-api.ga/',
    headers: {
        Accept: "application/json",
    }
})

instance.interceptors.request.use(request => {
    const authorization = localStorage.getItem('authorization') ? localStorage.getItem('authorization') : null

    if (request.headers && authorization) {
        request.headers.Authorization = authorization
    }

    return request
})

export default instance