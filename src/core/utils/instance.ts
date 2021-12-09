import axios from "axios";

const instance = axios.create({
    baseURL: 'https://linkstagram-api.ga/',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2l' +
            'kIjo1NzMwLCJhdXRoZW50aWNhdGVkX2J5IjpbImF1dG9sb2dp' +
            'biJdLCJhdXRvbG9naW5fdHlwZSI6ImNyZWF0ZV9hY2NvdW50In0.L9rejD0JlfHCPoRgDeoOh6BD6x0X7CpjAcnll_NN3m0'
    }
})

export default instance