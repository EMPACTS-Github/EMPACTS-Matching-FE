"use-client";
import axiosInstance from ".";

interface ISuggestMentorListInput {
    startupId: string;
}

export const suggest_mentor_list = async (data: ISuggestMentorListInput) => {
    const response = await axiosInstance.post('/suggestions', data);
    return response.data;
}