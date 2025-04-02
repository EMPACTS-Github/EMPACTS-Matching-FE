"use-client";
import axiosInstance from ".";
import axios from "axios";

export const startup_profile_detail = async (id: string) => {
    const response = await axiosInstance.get(`/startup-profile/${id}`);
    return response.data;
};

export const startup_list = async () => {
    const response = await axiosInstance.get('/startup-profile');
    return response.data;
}
