const ROOTS = {
  API: '/api',
  AUTH: '/auth',
  NOTIFICATION: '/notification',
  APPROVAL: '/approval',
  TERRITORY: '/territory',
  REGION: '/region',
  USER: '/user',
  ROLE: '/role',
  ACTIVITY: '/activity',
};

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  root: '/',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },

  notification: {
    root: `${ROOTS.NOTIFICATION}`,
  },

  approval: {
    root: `${ROOTS.APPROVAL}`,
    details: (id: string) => `${ROOTS.APPROVAL}/detail/${id}`,
  },

  territory: {
    root: `${ROOTS.TERRITORY}`,
  },

  region: {
    root: `${ROOTS.REGION}`,
  },

  user: {
    root: `${ROOTS.USER}`,
  },

  role: {
    root: `${ROOTS.ROLE}`,
  },

  activity: {
    root: `${ROOTS.ACTIVITY}`,
  },
};
