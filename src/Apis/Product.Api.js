/* eslint-disable no-console */
import axiosClient from "./clientAxios.js"

const url = "book/"
const getAll = async (page = 1, limit = 200) => {
    try {
        const res = await axiosClient.get(`${url}all`, {
            params: {
                page: page,
                limit: limit
            }
        })
        console.log(
            `LHA:  ===> file: Product.Api.js ===> line 13 ===> res`,
            res
        )
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const getByCate = async (id, page = 1, limit = 12) => {
    try {
        const res = await axiosClient.get(`${url}getProductsByCategory`, {
            params: {
                page: page,
                limit: limit,
                idCategory: id
            }
        })
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const getById = async id => {
    try {
        const res = await axiosClient.get(`${url}getProduct/${id}`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getFilter = async () => {
    try {
        const res = await axiosClient.get(`${url}filter`)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}
const create = async body => {
    try {
        const res = await axiosClient.post(`${url}createProduct`, { ...body })

        return res.data
    } catch (err) {
        console.log(err)
        return {
            success: false
        }
    }
}

const Product = { getAll, getById, getFilter, getByCate, create }

export default Product
