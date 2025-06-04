"use-client";
import axiosInstance from ".";

interface IEditStartupMember {
    startupId: string;
    positionTitle?: string;
    role?: string;
}

interface IDeleteStartupMember {
    startupId: string;
}

export const startup_member_edit_title = async (id: string, data: IEditStartupMember) => {
    const response = await axiosInstance.put(`/startup-members/${id}`, data);
    return response.data;
};

export const startup_member_change_permission = async (id: string, data: IEditStartupMember) => {
    const response = await axiosInstance.put(`/startup-members/${id}`, data);
    return response.data;
};

export const startup_member_delete = async (id: string, data: IDeleteStartupMember) => {
    const response = await axiosInstance.delete(`/startup-members/${id}`, { data });
    return response.data;
}