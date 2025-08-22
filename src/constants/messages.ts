// Profile and Settings Messages
export const PROFILE_MESSAGES = {
  // Success messages
  PROFILE_UPDATED_SUCCESS: 'Profile updated successfully',
  PROFILE_HIDDEN_SUCCESS: 'Profile has been hidden successfully',
  PROFILE_UNHIDDEN_SUCCESS: 'Profile has been unhidden successfully',
  PROFILE_DELETED_SUCCESS: 'Profile has been deleted successfully',
  IMAGE_UPLOADED_SUCCESS: 'Image uploaded successfully',
  ATTACHMENT_UPLOADED_SUCCESS: 'Attachement uploaded successfully',
  ATTACHMENT_DELETED_SUCCESS: 'Attachment deleted successfully',

  // Error messages
  PROFILE_UPDATE_FAILED: 'Failed to update the profile. Please try again.',
  PROFILE_UPDATE_ERROR: 'Failed to update profile',
  PROFILE_HIDE_FAILED: 'Failed to hide the profile',
  PROFILE_UNHIDE_FAILED: 'Failed to unhide the profile',
  PROFILE_DELETE_FAILED: 'Failed to delete the profile',
  IMAGE_UPLOAD_FAILED: 'Failed to upload the image. Please try again.',
  ATTACHMENT_DELETE_FAILED: 'Failed to delete the attachment',
  NO_FILE_SELECTED: 'No file selected. Please choose an image file.',

  // General messages
  GENERAL_ERROR: 'Oops! Something went wrong',
} as const;

// UI Labels and Text
export const UI_LABELS = {
  // Modal headers
  MENTOR_SETTING: 'Mentor Setting',
  STARTUP_SETTING: 'Startup Setting',

  // Section headers
  BASIC_INFORMATION: 'Basic information',
  MEDIA: 'Media',
  DOCUMENTATION: 'Documentation',
  ADVANCED_INFORMATION: 'Advanced Information',

  // Form labels
  MENTOR_NAME: 'Mentor name',
  MENTOR_USERNAME: 'Mentor username',
  STARTUP_NAME: 'Startup name',
  STARTUP_USERNAME: 'Startup username',
  LOCATION: 'Location',
  DESCRIPTION: 'Description',
  LANGUAGES_SPOKEN: 'Languages Spoken',
  SKILL_OFFERED: 'Skill Offered',
  SDGS_FOCUS_EXPERTISES: 'SDGs Focus Expertises',
  SDG_GOALS: 'SDG Goals',

  // Placeholders
  SELECT_LOCATION: 'Select your location',
  SELECT_LANGUAGES: 'Select languages',
  SELECT_SKILL_OFFERED: 'Select Skill Offered',
  SELECT_SDGS_EXPERTISES: 'Select SDGs Focus Expertises',
  SELECT_SDG_GOALS: 'Select SDG Goals',

  // Button labels
  CHANGE_PROFILE_PHOTO: 'Change profile photo',
  CANCEL: 'Cancel',
  UPDATE_PROFILE: 'Update profile',
  HIDE_PROFILE: 'Hide profile',
  UNHIDE_PROFILE: 'Unhide profile',
  DELETE_PROFILE: 'Delete profile',

  // Tab labels
  GENERAL: 'General',
  ADVANCED: 'Advanced',
  EXPLORE: 'Explore',
  PROFILE: 'Profile',
  MEMBER: 'Member',

  // Profile states
  HIDE_PROFILE_DESCRIPTION: 'Hide your profile from search results across entire platform.',
  PROFILE_HIDDEN_DESCRIPTION: 'Your profile is currently hidden from search results.',
  DELETE_PROFILE_DESCRIPTION: 'Once deleted, it will be gone forever. Please be certain.',

  // Advanced settings labels
  ACTIVE_USER: 'Active user',
  LATEST_REVENUE: 'Lastest Revenue',
  LEGAL_EQUITY: 'Legal Equity',
  INVESTMENT: 'Investment',
  FUNDRAISING: 'Fundraising',
} as const;

// Error codes and messages for suggestions
export const SUGGESTION_MESSAGES = {
  NO_SUGGESTION_FOUND: 'No suggestion found',
  FETCH_SUGGESTION_FAILED: 'Failed to fetch suggestion mentor',
} as const;

// Console error messages
export const CONSOLE_ERRORS = {
  FETCH_STARTUP_PROFILE_FAILED: 'Failed to fetch startup profile:',
  FETCH_SUGGESTED_MENTORS_FAILED: 'Failed to fetch suggested mentors:',
} as const;

// API Error codes
export const API_ERROR_CODES = {
  SUGGESTION_NOT_FOUND: 'SUGGESTION_NOT_FOUND',
} as const;

export type ProfileMessageKey = keyof typeof PROFILE_MESSAGES;
export type UILabelKey = keyof typeof UI_LABELS;
export type SuggestionMessageKey = keyof typeof SUGGESTION_MESSAGES;
export type ConsoleErrorKey = keyof typeof CONSOLE_ERRORS;
