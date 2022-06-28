/* eslint-disable no-console */
import axiosClient from "./clientAxios.js"

const url = "category/"
const getAll = async () => {
    try {
        const res = await axiosClient.get(`${url}getCategory`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const getForSelect = async () => {
    try {
        const res = await axiosClient.get(
            `${url}getSelectCategoryByRoom/6094fce7285d634bc09451a8`
        )
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const create = async body => {
    console.log("🚀 ~ file: Category.Api.js ~ line 26 ~ body", body)
    try {
        const res = await axiosClient.post(`${url}createCategory`, { ...body })

        return res.data
    } catch (err) {
        console.log(err)
        return {
            success: false
        }
    }
}
const Category = { getAll, getForSelect, create }

export default Category
