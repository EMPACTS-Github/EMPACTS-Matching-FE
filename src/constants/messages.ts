// Profile and Settings Messages
export const PROFILE_MESSAGES = {
  // Success messages
  PROFILE_UPDATED_SUCCESS: 'Profile updated successfully',
  TIME_AVAILABILITY_UPDATED_SUCCESS: 'Time availability updated successfully',
  PROFILE_HIDDEN_SUCCESS: 'Profile has been hidden successfully',
  PROFILE_UNHIDDEN_SUCCESS: 'Profile has been unhidden successfully',
  PROFILE_DELETED_SUCCESS: 'Profile has been deleted successfully',
  IMAGE_UPLOADED_SUCCESS: 'Image uploaded successfully',
  ATTACHMENTS_UPLOADED_SUCCESS: 'Attachments uploaded successfully',
  ATTACHMENT_DELETED_SUCCESS: 'Attachment deleted successfully',
  ATTACHMENT_UPLOADED_SUCCESS: 'Attachment uploaded successfully',
  ATTACHMENT_UPLOAD_FAILED: 'Failed to upload the attachment. Please try again.',

  // Error messages
  PROFILE_FETCH_FAILED: 'Failed to fetch profile data. Please try again.',
  PROFILE_UPDATE_FAILED: 'Failed to update the profile. Please try again.',
  PROFILE_UPDATE_ERROR: 'Failed to update profile',
  TIME_AVAILABILITY_UPDATE_FAILED: 'Failed to update time availability. Please try again.',
  PROFILE_HIDE_FAILED: 'Failed to hide the profile',
  PROFILE_UNHIDE_FAILED: 'Failed to unhide the profile',
  PROFILE_DELETE_FAILED: 'Failed to delete the profile',
  IMAGE_UPLOAD_FAILED: 'Failed to upload the image. Please try again.',
  ATTACHMENTS_UPLOAD_FAILED: 'Failed to upload the attachments. Please try again.',
  ATTACHMENT_DELETE_FAILED: 'Failed to delete the attachment',
  NO_FILE_SELECTED: 'No file selected. Please choose an image file.',
  SUGGESTION_MENTORS_FAILED: 'Failed to fetch suggestion mentors profile',
  INVALID_ATTACHMENT_TYPE:
    'Invalid attachment type. Please choose a valid attachment type. Supported types: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png, mp4.',
  INVALID_ATTACHMENT_SIZE: 'Invalid attachment size. Please choose a file smaller than 25MB.',
  INVALID_ACTIVE_USER: 'Invalid active user. Please enter a valid number.',
  INVALID_REVENUE: 'Invalid revenue. Please enter a valid number.',
  INVALID_STARTUP_NAME: 'Invalid startup name. Please enter a valid name.',
  INVALID_LOCATION: 'Invalid location. Please enter a valid location.',
  INVALID_SDG_GOAL: 'Invalid SDG goal. Please enter a valid SDG goal.',

  // Form validation errors
  FIELD_REQUIRED: 'This field cannot be blank',

  // General messages
  GENERAL_ERROR: 'Oops! Something went wrong',

  // Invitation error messages
  ERROR_CHECKING_INVITATION: 'Error in checking invitation status',
  ERROR_RESPONDING_INVITATION: 'Error in responsing invitation',

  // Matching messages
  ACCEPTED_MATCHING_REQUEST: 'Accepted Matching Request',
  REJECTED_MATCHING_REQUEST: 'Rejected Matching Request',
  RESPONSE_MATCHING_FAILED: 'Response Matching Request failed',
  FAILED_FETCH_STARTUP_DETAILS: 'Failed to fetch Startup details.',
  FAILED_FETCH_STARTUP_DOCUMENTS: 'Failed to fetch startup documents:',
  FINDING_MATCHING_REQUEST: 'The system is finding your matching reuquest. Please wait...',
  FETCH_UPCOMING_MEETINGS_FAILED: 'Failed to fetch upcoming meetings',
  FETCH_PENDING_REQUESTS_FAILED: 'Failed to fetch pending requests',
  NO_MATCHING_REQUEST_FOUND: 'No matching request found for this mentor',
  FETCH_MATCHING_REQUESTS_FAILED: 'Failed to fetch matching requests',
  FETCH_MENTOR_LIST_FAILED: 'Failed to fetch mentor list',
  FETCH_MENTOR_INFO_FAILED: 'Có lỗi xảy ra khi tải thông tin mentor, vui lòng thử lại',
  FETCH_STARTUP_INFO_FAILED: 'Có lỗi xảy ra khi tải thông tin startup, vui lòng thử lại',

  // Matching status labels
  STATUS: 'Status:',
  ALL: 'All',
  ACCEPTED: 'Accepted',
  PENDING: 'Pending',
  REJECT: 'Reject',
  ACCEPT: 'Accept',
  MEMBER: 'Member',

  // Form labels
  NOTE: 'Note',
  NO_NOTE_PROVIDED: 'No note provided',
  JOIN_GOOGLE_MEET: 'Join with Google Meet',

  // Tab labels
  REQUEST_DETAIL: 'Request detail',
  STARTUP_INFORMATION: 'Startup information',
  ADVANCED: 'Advanced',

  // Section labels
  DESCRIPTION: 'Description',
  NO_DESCRIPTION_AVAILABLE: 'No description available',
  PROFILE_LINK: 'Profile Link',
  NO_DATA: 'No Data',
  DOCUMENTATION: 'Documentation',
  MEDIA: 'Media',

  // Advanced section labels
  ACTIVE_USER: 'Active user',
  LATEST_REVENUE: 'Lastest Revenue',
  STARTUP_STATE: 'Startup State - State',
  LEGAL_EQUITY: 'Legal Equity',
  INVESTMENT: 'Investment',
  FUNDRAISING: 'Fundraising',

  // Data labels
  YES: 'Yes',
  NOT_YET: 'Not yet',
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
  MATCHING: 'Matching',

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

  // Profile card labels
  SETTINGS: 'SETTINGS',
  MEMBERS: 'Members',
  MATCH: 'Match',
  MATCHES: 'Matches',

  // Status labels
  ACTIVE: 'Active',
  ARCHIVED: 'Archived',
  DEACTIVATED: 'Deactivated',

  // Invitation labels
  YOURE_INVITED_AS: "You're invited as",
  DECLINE: 'Decline',
  ACCEPT: 'Accept',
  ACCEPTED_INVITATION: 'You have accepted invitation',
  WAIT_REDIRECT_STARTUP: 'Please wait and we will redirect you to startup homepage',
  REJECTED_INVITATION: 'You have rejected this invitation',
  WAIT_REDIRECT_HOME: 'Please wait and we will redirect you to homepage',
  INVITATION_EXPIRED: 'Invitation expired!',
  PLEASE_ASK_RESEND: 'Please ask your inviter to resend the invitation',
  RETURN_TO_HOME: 'Return to home',
  YOURE_LOGIN_AS: "You're login as",
  PLEASE_LOGIN_AS: 'Please login as',
  TO_CONTINUE: 'to continue',
  LOGIN_IN_AS: 'Login in as',

  // Matching tabs labels
  SCHEDULE_MEETING: 'Schedule Meeting',
  UPCOMING_MEETING: 'Upcoming Meeting',
  SENT_INVITATION: 'Sent Invitation',
  PAST_MEETING: 'Past Meeting',
  CONNECTION_REQUEST: 'Connection Request',
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
