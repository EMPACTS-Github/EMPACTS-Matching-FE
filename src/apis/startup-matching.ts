"use-client";
import axiosInstance from ".";

export const startup_matching_activity = async (id: string) => {
    const response = await axiosInstance.get(`/matching-for-startup/${id}`);
    return response.data;
};