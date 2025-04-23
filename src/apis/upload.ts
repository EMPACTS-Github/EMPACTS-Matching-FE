"use client";
import { IUploadData, IUpdateAttachmentData } from "@/interfaces/upload";
import axiosInstance from ".";

export const uploadAttachemt = async (uploadData: IUploadData) => {
  const formData = new FormData();
  formData.append("file", uploadData.file);
  formData.append("owner_type", uploadData.owner_type);
  if (uploadData.owner_id) {
    formData.append("owner_id", uploadData.owner_id as string);
  }
  const response = await axiosInstance.post("/attachments/file", formData);
  return response.data;
};

export const updateAttachment = async (updateData: IUpdateAttachmentData) => {
  const response = await axiosInstance.put("/attachments/file", updateData);
  return response.data;
};
