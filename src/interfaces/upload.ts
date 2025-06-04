export interface IUploadData {
  owner_type: string;
  owner_id?: string;
  file: File;
}

export interface IUpdateAttachmentData {
  id: number;
  owner_id?: string;
  owner_type: string;
  attachment_title?: string;
  is_deleted?: number;
}