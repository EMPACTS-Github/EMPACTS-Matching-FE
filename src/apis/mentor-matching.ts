'use-client';
import axiosInstance from '.';
export const mentor_matching_request_list = async (id: string) => {
  const response = await axiosInstance.get(`/matching-for-mentor/${id}`);
  return response.data;
};

export const response_matching_request = async (
  response: string,
  mentorId: string,
  connectRequestCode: string
) => {
  const params = {
    mentorId: mentorId,
    connectRequestCode: connectRequestCode,
    response: response,
  };
  const res = await axiosInstance.post(`/matching-for-mentor/`, params);
  return res.data;
};
