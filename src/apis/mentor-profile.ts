"use-client";
import axiosInstance from ".";

export const mentor_list = async () => {
    const response = await axiosInstance.get('/mentor-profile');
    return response.data;
}

export const mentor_profile_detail = async (id: string) => {
    const response = await axiosInstance.get(`/mentor-profile/${id}`);
    return response.data;
};