"use client";

import axiosInstance from ".";

export const upload_image = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.post("/attachments/image", formData);
  return response.data;
};
