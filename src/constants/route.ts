interface Route {
  name: string;
  pathname: string;
  isPrivate: boolean;
  hasHeader: boolean;
}

export const ROUTES: Route[] = [
  {
    name: 'Home',
    pathname: '/',
    isPrivate: false,
    hasHeader: true,
  },
  {
    name: 'Login',
    pathname: '/auth/login',
    isPrivate: false,
    hasHeader: false,
  },
  {
    name: 'SignUp',
    pathname: '/auth/signup',
    isPrivate: false,
    hasHeader: false,
  },
  {
    name: 'ForgotPassword',
    pathname: '/auth/forgot-password',
    isPrivate: false,
    hasHeader: false,
  },
  {
    name: 'ChooseProfile',
    pathname: '/profiles',
    isPrivate: true,
    hasHeader: true,
  },
  {
    name: 'ChooseCreateNewProfile',
    pathname: '/profiles/new',
    isPrivate: true,
    hasHeader: true,
  },
  {
    name: 'CreateNewStartupProfile',
    pathname: '/profiles/new/startup',
    isPrivate: true,
    hasHeader: false,
  },
  {
    name: 'StartupDetail',
    pathname: '/startup/:param',
    isPrivate: false,
    hasHeader: true,
  },
  {
    name: 'StartupProfileDetail',
    pathname: '/startup-detail/:param',
    isPrivate: true,
    hasHeader: true,
  },
  {
    name: 'StartupInvitation',
    pathname: '/startup-invitation',
    isPrivate: true,
    hasHeader: true,
  }
];
