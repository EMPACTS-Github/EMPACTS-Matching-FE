// Error message and code define

// Profile and Settings Error Messages
export const PROFILE_ERROR_MESSAGES = {
  PROFILE_UPDATE_FAILED: 'Failed to update the profile. Please try again.',
  PROFILE_UPDATE_ERROR: 'Failed to update profile',
  PROFILE_HIDE_FAILED: 'Failed to hide the profile',
  PROFILE_UNHIDE_FAILED: 'Failed to unhide the profile',
  PROFILE_DELETE_FAILED: 'Failed to delete the profile',
  IMAGE_UPLOAD_FAILED: 'Failed to upload the image. Please try again.',
  ATTACHMENT_DELETE_FAILED: 'Failed to delete the attachment',
  NO_FILE_SELECTED: 'No file selected. Please choose an image file.',
  GENERAL_ERROR: 'Oops! Something went wrong',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED_SUCCESS: 'Profile updated successfully',
  PROFILE_HIDDEN_SUCCESS: 'Profile has been hidden successfully',
  PROFILE_UNHIDDEN_SUCCESS: 'Profile has been unhidden successfully',
  PROFILE_DELETED_SUCCESS: 'Profile has been deleted successfully',
  IMAGE_UPLOADED_SUCCESS: 'Image uploaded successfully',
  ATTACHMENT_UPLOADED_SUCCESS: 'Attachement uploaded successfully',
  ATTACHMENT_DELETED_SUCCESS: 'Attachment deleted successfully',
} as const;

// Suggestion Error Messages
export const SUGGESTION_ERROR_MESSAGES = {
  NO_SUGGESTION_FOUND: 'No suggestion found',
  FETCH_SUGGESTION_FAILED: 'Failed to fetch suggestion mentor',
} as const;

// Console Error Messages
export const CONSOLE_ERROR_MESSAGES = {
  FETCH_STARTUP_PROFILE_FAILED: 'Failed to fetch startup profile:',
  FETCH_SUGGESTED_MENTORS_FAILED: 'Failed to fetch suggested mentors:',
} as const;

// API Error Codes
export const API_ERROR_CODES = {
  SUGGESTION_NOT_FOUND: 'SUGGESTION_NOT_FOUND',
} as const;

export type ProfileErrorKey = keyof typeof PROFILE_ERROR_MESSAGES;
export type SuccessMessageKey = keyof typeof SUCCESS_MESSAGES;
export type SuggestionErrorKey = keyof typeof SUGGESTION_ERROR_MESSAGES;
export type ConsoleErrorKey = keyof typeof CONSOLE_ERROR_MESSAGES;
