export interface IUploadData {
  ownerType: string;
  ownerId?: string;
  file: File;
}

export interface IUpdateAttachmentData {
  id: number;
  ownerId?: string;
  ownerType: string;
  attachmentTitle?: string;
  isDeleted?: number;
}