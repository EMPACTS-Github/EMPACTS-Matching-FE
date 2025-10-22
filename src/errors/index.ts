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
  AVAILABILITY_UPDATE_FAILED: 'Failed to update time availability',
  AVAILABILITY_FETCH_FAILED: 'Failed to fetch time availability',
  GENERAL_ERROR: 'Oops! Something went wrong',
  STARTUP_NAME_ALREADY_TAKEN: 'Startup name already taken. Please try another name.',
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
  AVAILABILITY_UPDATED_SUCCESS: 'Time availability updated successfully',
} as const;

// Validation Error Messages
export const VALIDATION_ERROR_MESSAGES = {
  MENTOR_NAME_REQUIRED: 'Mentor name is required',
  LOCATION_REQUIRED: 'Location is required',
  SDG_GOAL_REQUIRED: 'At least one SDG Goal is required',
  DESCRIPTION_REQUIRED: 'Description is required',
  YEAR_EXPERIENCE_INVALID: 'Year of experience must be greater than 0',
  INDUSTRY_REQUIRED: 'Industry is required',
  SKILL_OFFERED_REQUIRED: 'At least one skill is required',
  MARKET_FOCUS_REQUIRED: 'Market focus is required',
  FUNDING_STAGE_REQUIRED: 'Funding stage experience is required',
  FORM_VALIDATION_FAILED: 'Please fix the errors below',
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
export type ValidationErrorKey = keyof typeof VALIDATION_ERROR_MESSAGES;
export type SuggestionErrorKey = keyof typeof SUGGESTION_ERROR_MESSAGES;
export type ConsoleErrorKey = keyof typeof CONSOLE_ERROR_MESSAGES;
