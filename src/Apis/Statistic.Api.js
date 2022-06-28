/* eslint-disable no-console */

import axiosClient from "./clientAxios"

const url = "statistics/"
const getTop10Customer = async () => {
    try {
        const res = await axiosClient.get(`${url}rankTenPeopleBill`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const getTop10ProductCanceled = async () => {
    try {
        const res = await axiosClient.get(`${url}rankTenProductCancel`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const getTop10ProductHot = async () => {
    try {
        const res = await axiosClient.get(`${url}rankTenProductBill`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const Statistic = {
    getTop10Customer,
    getTop10ProductCanceled,
    getTop10ProductHot
}

export default Statistic
