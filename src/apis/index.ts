'use client'

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3001/api',
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  // Ensure credentials are always included
  config.withCredentials = true;
  return config;
});

export default axiosInstance
