"use client";

import axios from "axios";
import { refresh_token } from "./auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // Ensure credentials are always included
  config.withCredentials = true;
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 error and ensure the retry happens only once
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark this request as retried

//       try {
//         // Call refresh_token to get a new access token
//         const data = await refresh_token();
//         if (!data?.accessToken) {
//           // If no access token is returned, reject the error
//           return Promise.reject(error);
//         }

//         // Store the new token and update headers
//         localStorage.setItem("accessToken", data.accessToken);
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.accessToken}`;
//         originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

//         // Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refreshing the token fails, reject the error
//         console.error("Token refresh failed:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     // If it's not a 401 error or already retried, reject the error
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
