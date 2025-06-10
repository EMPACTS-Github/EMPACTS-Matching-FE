"use-client";
import axiosInstance from ".";
export const mentor_matching_request_list = async (id: string) => {
    const response = await axiosInstance.get(`/matching-for-mentor/${id}`);
    return response.data;
};
