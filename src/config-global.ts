import { paths } from './pages/paths';

// API
export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const GOOGLE_SITE_KEY = import.meta.env.VITE_GOOGLE_SITE_KEY;

export const IS_CAPTCHA_ACTIVE = import.meta.env.VITE_IS_CAPTCHA;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.approval.root;

export const ACCESS_TOKEN_KEY = 'accessToken';

export const MAP_ID = '70a0fe702821572b';

// ROLE GROUPING
export const SUPER_ROLE = ['SUPERSAIYAN'];
export const BASIC_ROLE = [
  'SUPERSAIYAN',
  'PTPL_IT',
  'PTPL_QA',
  'PTPL_PROD',
  'GUEST',
  'EMPLOYEE',
  'VENDOR',
];
