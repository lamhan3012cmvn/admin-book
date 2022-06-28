/* eslint-disable no-console */
import axios from "axios"
import queryString from "query-string"
import Cookie from "js-cookie"
const axiosClient = axios.create({
    baseURL: "https://book-store-online-be.herokuapp.com/rest/",
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    paramsSerializer: params => {
        return queryString.stringify(params)
    }
})
axiosClient.interceptors.request.use(
    config => {
        //Handle token here ...
        const token = Cookie.get("token")
        config.headers.authorization = `Bearer ${token}`

        return config
    },
    err => {
        console.log(err)
    }
)
axiosClient.interceptors.response.use(
    res => {
        if (res && res.data) return res.data
        return res
    },
    err => {
        //Handle err
        // eslint-disable-next-line no-console
        console.log(err)
    }
)

export default axiosClient
