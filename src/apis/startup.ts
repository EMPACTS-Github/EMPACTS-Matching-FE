'use client';
import axiosInstance from '.';
import { LanguagesSpoken } from '@/constants/common';

interface Member {
  email: string;
  title: string;
}

export const startup_list = async (limit: number, page: number, category?: string[]) => {
  if (category?.length) {
    const queryStr = category.map((cat) => `&sdgGoals=${cat}`).join('');
    const response = await axiosInstance.get(`/startups?limit=${limit}&page=${page}${queryStr}`);
    return response.data;
  }
  const response = await axiosInstance.get(`/startups?limit=${limit}&page=${page}`);
  return response.data;
};

export const startup_detail = async (id: string) => {
  const response = await axiosInstance.get(`/startups/${id}`);
  return response.data;
};

export const create_startup_profile = async (data: {
  name: string;
  startupUsername: string;
  locationBased: string;
  sdgGoal: string;
  description: string;
  avtUrl: string | null;
  formedTime: Date | null;
  languagesSpoken: LanguagesSpoken;
}) => {
  // Transform the data to match the API expectations
  const transformedData = {
    ...data,
    formedTime: data.formedTime ? data.formedTime.toISOString().split('T')[0] : null,
  };

  const response = await axiosInstance.post('/startups', transformedData);
  return response.data;
};

export const invite_list_member = async (data: {
  invitee: Member[];
  inviterEmail: string;
  startupId: string;
}) => {
  const transformedData = {
    startupId: data.startupId,
    inviterEmail: data.inviterEmail,
    invitee: data.invitee.map((i) => ({ email: i.email, positionTitle: i.title })),
  };
  const response = await axiosInstance.post('/startup-invitation/invite', transformedData);
  return response.data;
};

export const search_startup = async (query: string) => {
  const response = await axiosInstance.get(`/startups/search?name=${query}`);
  return response.data;
};
