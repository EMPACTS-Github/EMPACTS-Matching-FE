"use-client";
import axiosInstance from ".";

interface IUpdateMentorProfile {
    name?: string,
    locationBased?: string,
    avtUrl?: string,
    description?: string;
    sdgGoal?: string;
    isHide?: boolean;
};

export const mentor_list = async () => {
    const response = await axiosInstance.get('/mentor-profile');
    return response.data;
}

export const mentor_profile_detail = async (id: string) => {
    const response = await axiosInstance.get(`/mentor-profile/${id}`);
    return response.data;
};

export const mentor_profile_update = async (id: string, data: IUpdateMentorProfile) => {
    const response = await axiosInstance.put(`/mentor-profile/${id}`, data);
    return response.data;
};