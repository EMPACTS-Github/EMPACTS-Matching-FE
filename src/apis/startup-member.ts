"use-client";
import axiosInstance from ".";

interface IEditStartupMember {
    startup_id: number | undefined;
    position_title?: string;
    role?: string;
}

interface IDeleteStartupMember {
    startupId: number | undefined;
}

export const startup_member_edit_title = async (id: number | undefined, data: IEditStartupMember) => {
    const response = await axiosInstance.put(`/startup-members/${id}`, data);
    return response.data;
};

export const startup_member_change_permission = async (id: number | undefined, data: IEditStartupMember) => {
    const response = await axiosInstance.put(`/startup-members/${id}`, data);
    return response.data;
};

export const startup_member_delete = async (id: number | undefined, data: IDeleteStartupMember) => {
    const response = await axiosInstance.delete(`/startup-members/${id}`, { data });
    return response.data;
}