'use-client';
import axiosInstance from '.';

interface IUpdateMentorProfile {
  name?: string;
  mentorUsername?: string;
  locationBased?: string;
  avtUrl?: string;
  description?: string;
  sdgFocusExpertises?: string[];
  skillOffered?: string[];
  languagesSpoken?: string[];
  marketFocusExpertise?: string;
  experienceWithFundingStage?: string[];
  yearOfProfessionalExperience?: number;
  currentWorkplace?: string;
  currentPosition?: string;
  industryFocus?: string[];
  isHide?: boolean;
}

export const mentor_list = async () => {
  const response = await axiosInstance.get('/mentor-profile');
  return response.data;
};

export const mentor_profile_detail = async (id: string) => {
  const response = await axiosInstance.get(`/mentor-profile/${id}`);
  return response.data;
};

export const mentor_profile_update = async (id: string, data: IUpdateMentorProfile) => {
  const response = await axiosInstance.put(`/mentor-profile/${id}`, data);
  return response.data;
};

export const mentor_profile_delete = async (id: string) => {
  const response = await axiosInstance.delete(`/mentor-profile/${id}`);
  return response.data;
};
