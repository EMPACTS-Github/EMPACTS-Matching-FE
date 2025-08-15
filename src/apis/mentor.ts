'use-client';
import axiosInstance from '.';
import { LanguagesSpoken } from '@/constants/common';

export const mentor_search = async (limit: number, page: number, keyword?: string) => {
  if (keyword) {
    const response = await axiosInstance.get(
      `/mentor/search?limit=${limit}&page=${page}&keyword=${keyword}`
    );
    return response.data;
  }
  const response = await axiosInstance.get(`/mentor/search?limit=${limit}&page=${page}`);
  return response.data;
};

export const startup_profile_detail = async (startupId: string, mentorId: string) => {
  const response = await axiosInstance.post(`/mentor/startup-profile`, {
    startupId,
    mentorId,
  });
  return response.data;
};

export const create_mentor_profile = async (data: {
  name: string;
  mentorUsername: string;
  locationBased: string;
  sdgFocusExpertises: string[];
  description: string;
  skillOffered: string[];
  avtUrl: string | null;
  languagesSpoken: LanguagesSpoken;
  phone?: string;
}) => {
  const response = await axiosInstance.post(`/mentor`, data);
  return response.data;
};
