"use client";
import axiosInstance from ".";

interface Member {
  email: string;
  title: string;
}

export const startup_list = async (
  limit: number,
  page: number,
  category?: string[]
) => {
  if (category?.length) {
    const queryStr = category.map((cat) => `&category=${cat}`).join("");
    const response = await axiosInstance.get(
      `/startups?limit=${limit}&page=${page}${queryStr}`
    );
    return response.data;
  }
  const response = await axiosInstance.get(
    `/startups?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const startup_detail = async (id: number) => {
  const response = await axiosInstance.get(`/startups/${id}`);
  return response.data;
};

export const create_startup_profile = async (data: {
  name: string;
  location_based: string;
  category: string;
//   imgUrl: string;
}) => {
  const response = await axiosInstance.post("/startups", data);
  return response.data;
};

export const invite_list_member = async (data: {
    invitee: Member[];
    inviterEmail: string;
    startupId: number;
}) => {
    const transformedData = {
      startupId: data.startupId,
      inviterEmail: data.inviterEmail,
      invitee: data.invitee.map((i) => ({ email: i.email, position_title: i.title })),
    };
    const response = await axiosInstance.post("/startup-invitation/invite", transformedData);
    return response.data;
};

export const search_startup = async (query: string) => {
  const response = await axiosInstance.get(`/search/startups?query=${query}`);
  return response.data;
}
