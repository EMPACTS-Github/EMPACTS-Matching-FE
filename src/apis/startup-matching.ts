"use-client";
import { data } from "framer-motion/client";
import axiosInstance from ".";
import { MATCHING_STATUS } from "@/constants/matching";


export const startup_matching_activity = async (id: string) => {
    const response = await axiosInstance.get(`/matching-for-startup/${id}`);
    return response.data;
};

export const cancel_matching_request = async (startupId: string, connectRequestCode: string) => {
    const params = {
        startupId: startupId,
        status: MATCHING_STATUS.CANCELED,
        connectRequestCode: connectRequestCode,
    };
    const response = await axiosInstance.put(`/matching-for-startup/`, params);
    return response.data;
}