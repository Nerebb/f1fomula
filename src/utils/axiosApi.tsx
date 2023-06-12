import { driver } from "@prisma/client"
import { driverSearch } from "@types"
import axiosClient from "./axiosClient"
import { buildQuery } from "./buildQuery"

type AxiosApi = {
    getDrivers: (props?: driverSearch) => Promise<driver[]>
}

const API_DRIVER = '/api/driver'

const axios: AxiosApi = {
    getDrivers: async (props) => {
        try {
            const url = props ? buildQuery(`${API_DRIVER}`, props) : `${API_DRIVER}`
            const res = await axiosClient.get(`${url}`)
            return res.data
        } catch (error: any) {
            console.log('Axios-GetUser', error)
            throw error.message
        }
    },
}


export default axios