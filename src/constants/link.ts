export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },

  // Profile routes
  PROFILES: {
    NEW: "/profiles/new",
  },

  // Startup routes
  STARTUP: {
    INVITATION: "/startup-invitation",
    DETAIL: "/startup-detail",
  },

  // Mentor routes
  MENTOR: {
    DETAIL: "/mentor-detail",
  },
} as const;

export const getStartupInvitationUrl = (code: string, email: string) =>
  `${ROUTES.STARTUP.INVITATION}?code=${code}&email=${email}`;

export const getStartupDetailUrl = (id: string) =>
  `${ROUTES.STARTUP.DETAIL}/${id}`;

export const getMentorDetailUrl = (id: string) =>
  `${ROUTES.MENTOR.DETAIL}/${id}`;

// Default avatar placeholder URL
export const DEFAULT_AVATAR_URL =
  process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL || "";
