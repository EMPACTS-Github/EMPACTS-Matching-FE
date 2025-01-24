'use client'
import axiosInstance from "."

export const loginWithGoogleAPI = () => {
  window.location.href = 'http://localhost:3001/api/auth/google/login'
}
