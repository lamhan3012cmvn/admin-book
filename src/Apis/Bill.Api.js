/* eslint-disable no-console */
import axiosClient from "./clientAxios.js"

const url = "pendingCart/"

const getBillByStatus = async params => {
    console.log("🚀 ~ file: Bill.Api.js ~ line 7 ~ params", params)
    try {
        const res = await axiosClient.get(`${url}admin/getPendingCart`, {
            params: params
        })
        if (res) {
            return {
                success: true,
                data: res.data
            }
        }
        return {
            success: false,
            data: {}
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            data: {}
        }
    }
}
const changeStatus = async params => {
    console.log("🚀 ~ file: Bill.Api.js ~ line 7 ~ params", params)
    try {
        const res = await axiosClient.post(`${url}admin/changeStatus`, params)
        console.log("🚀 ~ file: Bill.Api.js ~ line 34 ~ res", res)
        if (res) {
            return {
                success: true
            }
        }
        return {
            success: false
        }
    } catch (err) {
        console.log(err)
        return {
            success: false
        }
    }
}

const Bill = {
    getBillByStatus,
    changeStatus
}

export default Bill
