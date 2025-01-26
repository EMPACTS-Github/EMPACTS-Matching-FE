'use client'

import axiosInstance from "."

export const startup_list = async (limit: number, page: number) => {
    const response = await axiosInstance.get(`/startups/public/all?limit=${limit}&page=${page}`)
    return response.data
}
