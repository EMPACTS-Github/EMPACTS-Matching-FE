export const ROUTES = {
  HOME: {
    PATHNAME: '/',
    PRIVATE: false,
  },
  STARTUP: {
    PATHNAME: '/startup',
    PRIVATE: false,
  },
  PROFILE: {
    PATHNAME: '/profiles',
    PRIVATE: true,
  },
  CREATE_PROFILE: {
    PATHNAME: '/profiles/new',
    PRIVATE: true,
  },
  CREATE_STARTUP_PROFILE: {
    PATHNAME: '/profiles/new/startup',
    PRIVATE: true,
  }
}
