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

export const uploadProfilePicture = async (file: File, ownerType: string, ownerId?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('ownerType', ownerType);
  if (ownerId) {
    formData.append('ownerId', ownerId);
  }

  const response = await axiosInstance.post('/attachments/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export const getS3PresignedUrl = async (fileName: string, fileType: string) => {
  const response = await axiosInstance.get('/s3/presigned-url', {
    params: {
      fileName,
      fileType,
    },
  });
  return response.data;
};

export const uploadToS3ByPresignedUrl = async (url: string, file: File) => {
  const response = await axiosInstance.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
  return response.data;
};
