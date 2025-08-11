"use client";
import axiosInstance from ".";

export const loginWithGoogleAPI = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/oauth/google/login`;
};

// base auth

export const emailSignup = async (email: string) => {
  const response = await axiosInstance.post("/base-auth/email-verification", {
    email,
  });
  return response.data;
};

export const createNewPassword = async (email: string, password: string) => {
  const response = await axiosInstance.post("/base-auth/new-password", {
    email,
    password,
  });
  return response.data;
};

export const verifyOTP = async (email: string, otpCode: string) => {
  const response = await axiosInstance.post("/base-auth/otp-verification", {
    email,
    otpCode,
  });
  return response.data;
};

export const createNewProfile = async (
  email: string,
  avtUrl: string,
  name: string
) => {
  const response = await axiosInstance.post("/base-auth/new-profile", {
    email,
    avtUrl,
    name,
  });
  return response.data;
};

// auth
export const emailSignin = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/sign-in", {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post("/auth/refresh-token");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

// password
export const sendForgotPasswordOTP = async (email: string) => {
  const response = await axiosInstance.post("/password/otp-email", { email });
  return response.data;
};

export const resetPassword = async (email: string, password: string) => {
  const response = await axiosInstance.post("/password/reset", {
    email,
    password,
  });
  return response.data;
};

export const verifyForgotPasswordOTP = async (
  email: string,
  otpCode: string
) => {
  const response = await axiosInstance.post("/password/otp-verification", {
    email,
    otpCode,
  });
  return response.data;
};
