export interface IUploadData {
  ownerType: string;
  ownerId?: string;
  file: File;
}

export interface IUpdateAttachmentData {
  id: string;
  ownerId?: string;
  ownerType: string;
  attachmentTitle?: string;
  isDeleted?: boolean;
}

export interface IGetStartupDocumentsData {
  ownerId: string;
  ownerType: string;
  limit: number;
  page: number;
}

export interface IDocument {
  id: string;
  ownerId: string;
  ownerType: string;
  attachmentUrl: string;
  attachmentTitle: string;
  type: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}