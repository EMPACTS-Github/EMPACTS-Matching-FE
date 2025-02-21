'use client'
import axiosInstance from "."

export const loginWithGoogleAPI = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/oauth/google/login`
}

export const email_signup = async (email: string) => {
  const response = await axiosInstance.post('/auth/verify-email', { email })
  return response.data
}

export const verify_OTP = async (email: string, otpCode: string) => {
  const response = await axiosInstance.post('/auth/verify-otp', { email, otpCode })
  return response.data
}

export const create_new_password = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/create-password', { email, password })
  return response.data
}

export const create_new_profile = async (email: string, avtUrl: string, name: string) => {
  const response = await axiosInstance.post('/auth/create-profile', { email, avtUrl, name })
  return response.data
}

export const email_signin = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/sign-in', { email, password })
  return response.data
}

export const send_forgot_password_otp = async (email: string) => {
  const response = await axiosInstance.post('/auth/password/otp', { email })
  return response.data
}

export const verify_forgot_password_otp = async (email: string, otpCode: string) => {
  const response = await axiosInstance.post('/auth/password/otp-verify', { email, otpCode })
  return response.data
}

export const reset_password = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/password/reset', { email, password })
  return response.data
}

export const refresh_token = async () => {
  const response = await axiosInstance.post('/auth/refresh-token')
  return response.data
}
