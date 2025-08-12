'use client';

import axiosInstance from '.';

export const getUserAuthInfoAPI = async () => {
  const response = await axiosInstance.get('/users/auth-info', {
    withCredentials: true,
  });
  return response.data;
};
