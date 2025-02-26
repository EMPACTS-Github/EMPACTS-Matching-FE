'use client'
import axiosInstance from "."

export const loginWithGoogleAPI = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/oauth/google/login`
}

export const email_signup = async (email: string) => {
  const response = await axiosInstance.post('/base-auth/email-verification', { email })
  return response.data
}

export const verify_OTP = async (email: string, otpCode: string) => {
  const response = await axiosInstance.post('/base-auth/otp-verification', { email, otpCode })
  return response.data
}

export const create_new_password = async (email: string, password: string) => {
  const response = await axiosInstance.post('/base-auth/new-password', { email, password })
  return response.data
}

export const create_new_profile = async (email: string, avtUrl: string, name: string) => {
  const response = await axiosInstance.post('/base-auth/new-profile', { email, avtUrl, name })
  return response.data
}

export const email_signin = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/sign-in', { email, password })
  return response.data
}

export const send_forgot_password_otp = async (email: string) => {
  const response = await axiosInstance.post('/password/otp-email', { email })
  return response.data
}

export const verify_forgot_password_otp = async (email: string, otpCode: string) => {
  const response = await axiosInstance.post('/password/otp-verification', { email, otpCode })
  return response.data
}

export const reset_password = async (email: string, password: string) => {
  const response = await axiosInstance.post('/password/reset', { email, password })
  return response.data
}

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout')
  return response.data
}

export const refresh_token = async () => {
  const response = await axiosInstance.post('/auth/refresh-token')
  return response.data
}
