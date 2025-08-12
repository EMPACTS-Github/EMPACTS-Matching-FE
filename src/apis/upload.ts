'use client';
import {
  IUploadData,
  IUpdateAttachmentData,
  IGetStartupDocumentsData,
  IDocument,
} from '@/interfaces/upload';
import axiosInstance from '.';

export const uploadAttachemt = async (uploadData: IUploadData) => {
  const formData = new FormData();
  formData.append('file', uploadData.file);
  formData.append('ownerType', uploadData.ownerType);
  if (uploadData.ownerId) {
    formData.append('ownerId', uploadData.ownerId as string);
  }
  const response = await axiosInstance.post('/attachments/file', formData);
  return response.data;
};

export const updateAttachment = async (updateData: IUpdateAttachmentData) => {
  const response = await axiosInstance.put('/attachments/file', updateData);
  return response.data;
};

export const getStartupDocuments = async (getStartupDocumentsData: IGetStartupDocumentsData) => {
  const response = await axiosInstance.get('/attachments/file', {
    params: getStartupDocumentsData,
  });
  return response.data;
};
