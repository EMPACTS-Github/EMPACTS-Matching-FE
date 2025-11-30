'use-client';
import axiosInstance from '.';
import { MentorMatchingRequest } from '@/interfaces/matching';

export const mentor_matching_request_list = async (
  status: string
): Promise<MentorMatchingRequest[]> => {
  const response = await axiosInstance.get(`/matching-for-mentor/requests?status=${status}`);
  return response.data;
};

export const response_matching_request = async (status: string, requestId: string) => {
  const body = {
    status: status,
  };
  const res = await axiosInstance.patch(`/matching-for-mentor/requests/${requestId}/respond`, body);
  return res.data;
};
