export const UPLOAD_OWNER_TYPE = {
  STARTUP: 'STARTUP',
  MENTOR: 'MENTOR',
  USER: 'USER',
};

export const ATTACHMENTS_TYPE = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'xls',
  XLSX: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT: 'ppt',
  PPTX: 'vnd.openxmlformats-officedocument.presentationml.presentation',
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
  MP4: 'mp4',
};

export const ATTACHMENTS_TYPE_IMAGE = {
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
};

export const ATTACHMENTS_TYPE_VIDEO = {
  MP4: 'mp4',
};

export const ATTACHMENTS_TYPE_DOCUMENT = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'xls',
  XLSX: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT: 'ppt',
  PPTX: 'vnd.openxmlformats-officedocument.presentationml.presentation',
};

export const SPECIAL_ATTACHMENT_TYPE = {
  [ATTACHMENTS_TYPE.DOCX]: 'docx',
  [ATTACHMENTS_TYPE.PPTX]: 'pptx',
  [ATTACHMENTS_TYPE.XLSX]: 'xlsx',
};

export const ATTACHMENT_MAX_SIZE = 25 * 1024 * 1024; // 25mb
