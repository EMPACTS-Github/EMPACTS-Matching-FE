"use-client";
import axiosInstance from ".";

export const mentor_search = async (
    limit: number,
    page: number,
    keyword?: string,
) => {
    if (keyword) {
        const response = await axiosInstance.get(
            `/mentor/search?limit=${limit}&page=${page}&keyword=${keyword}`
        );
        return response.data;
    }
    const response = await axiosInstance.get(
        `/mentor/search?limit=${limit}&page=${page}`
    );
    return response.data;
};

export const startup_profile_detail = async (startupId: string, mentorId: string) => {
    const response = await axiosInstance.post(`/mentor/startup-profile`, {
        startupId,
        mentorId
    });
    return response.data;
};