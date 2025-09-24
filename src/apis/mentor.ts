'use-client';
import axiosInstance from '.';

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
  skillOffered: string[];
  avtUrl: string | null;
  industryFocus: string;
  marketFocusExpertise: string;
  yearOfProfessionalExperience: string | undefined;
  currentPosition: string | undefined;
  currentWorkplace: string | undefined;
  timeAvailability?: Record<string, Array<{ from: number; to: number }>>;
}) => {
  const response = await axiosInstance.post(`/mentor`, data);
  return response.data;
};
