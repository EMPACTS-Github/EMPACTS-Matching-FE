// API Response Codes
export const API_RESPONSE_CODES = {
  // Auth related
  LOGIN: 'LOGIN',
  VERIFICATION_EMAIL_SENT: 'VERIFICATION_EMAIL_SENT',
  EMAIL_SUCCESSFULLY_VERIFIED: 'EMAIL_SUCCESSFULLY_VERIFIED',
  OTP_EXPIRED: 'OTP_EXPIRED',
  OTP_INCORRECT: 'OTP_INCORRECT',
  PASSWORD_CREATED: 'PASSWORD_CREATED',
  PASSWORD_RESETED: 'PASSWORD_RESETED',
  RESET_PASSWORD: 'RESET_PASSWORD',

  // Forgot password related
  FORGOT_PASSWORD_EMAIL_SENT: 'FORGOT_PASSWORD_EMAIL_SENT',
  EMAIL_ALREADY_SENT: 'EMAIL_ALREADY_SENT',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  OTP_VERIFIED: 'OTP_VERIFIED',

  // Matching related
  MATCHING_ACTIVITY_NOT_FOUND: 'MATCHING_ACTIVITY_NOT_FOUND',
} as const;

// Toast timeout values (in milliseconds)
export const TOAST_TIMEOUT = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

// Default toast timeout
export const DEFAULT_TOAST_TIMEOUT = TOAST_TIMEOUT.MEDIUM;

// Toast colors
export const TOAST_COLORS = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  PRIMARY: 'primary',
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  // Success messages
  LOGIN_SUCCESS: 'Login successful',
  OTP_VERIFIED_SUCCESS: 'OTP code verified successfully',
  PASSWORD_CREATED_SUCCESS: 'Password created successfully',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully',
  VERIFICATION_EMAIL_SENT: 'Verification code sent to your email',
  AVATAR_UPLOADED: 'Avatar uploaded',
  CONNECT_REQUEST_SENT: 'Connect request sent successfully',

  // Error messages
  INVALID_CREDENTIALS: 'Invalid credentials',
  LOGIN_ERROR: 'An error occurred while logging in',
  GOOGLE_LOGIN_FAILED: 'Login with Google failed!',
  GOOGLE_LOGIN_SUCCESS: 'Login with Google successful!',
  SIGNUP_ERROR: 'An error occurred while signing up',
  USER_ALREADY_EXISTS: 'User already exist',
  OTP_VERIFY_ERROR: 'An error occurred while verifying the OTP',
  OTP_EXPIRED: 'OTP code has expired. Please request a new one.',
  OTP_INCORRECT: 'Incorrect OTP code. Please try again.',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_CREATE_ERROR: 'An error occurred while creating the password',
  PASSWORD_RESET_ERROR: 'An error occurred while resetting password',
  FORGOT_PASSWORD_ERROR: 'An error occurred while sending the verification code',
  EMAIL_ALREADY_SENT: 'Email already sent. Please wait 1 minutes before requesting again.',
  INVALID_EMAIL_FORMAT: 'Invalid email format',
  AVATAR_UPLOAD_ERROR: 'An error occured while uploading avatar. Please try again.',
  PROFILE_CREATE_ERROR: 'An error occurred while creating profile',
  PASSWORD_RESET_FAILED: 'Failed to reset password',
  SELECT_DATE_TIME: 'Select a date time to connect',
  STARTUP_ID_NOT_AVAILABLE: 'Startup ID is not available',
  USER_HAS_NO_PERMISSION: 'You have no permission to connect with this mentor',
  REQUEST_FAILED: 'Request failed. Please try again later.',
} as const;

// API Response Codes
export const API_RESPONSE_NUMBER_CODES = {
  // Auth related
  LOGIN_INVALID_CREDENTIALS: 400,
  // Not found matching
  MATCHING_ACTIVITY_NOT_FOUND: 404,
} as const;
