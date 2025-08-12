'use-client';
import axiosInstance from '.';

interface IUpdateStartupProfile {
  name?: string;
  locationBased?: string;
  avtUrl?: string;
  description?: string;
  sdgGoal?: string;
  isHide?: boolean;
  // startup_link?: string;
  // market_focus?: string;
  // have_active_use?: number;
  // revenue?: number;
  // legal_equity_detail?: string;
  // investment_detail?: string;
  // fundraising_detail?: string;
}

export const startup_profile_detail = async (id: string) => {
  const response = await axiosInstance.get(`/startup-profile/${id}`);
  return response.data;
};

export const startup_list = async () => {
  const response = await axiosInstance.get('/startup-profile');
  return response.data;
};

export const startup_profile_update = async (id: string, data: IUpdateStartupProfile) => {
  const response = await axiosInstance.put(`/startup-profile/${id}`, data);
  return response.data;
};

export const startup_profile_delete = async (id: string) => {
  const response = await axiosInstance.delete(`/startup-profile/${id}`);
  return response.data;
};
