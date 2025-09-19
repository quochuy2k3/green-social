export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'https://api.greensocial.com' : 'https://api.greensocial.com',
  PRODUCTION_URL: 'https://api.greensocial.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
    USERS: {
      BASE: '/users',
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      UPLOAD_AVATAR: '/users/avatar',
    },
    COMMUNITY: {
      BASE: '/community',
      POSTS: '/community/posts',
      COMMENTS: '/community/comments',
      LIKES: '/community/likes',
    },
    STORE: {
      BASE: '/store',
      PRODUCTS: '/store/products',
      CATEGORIES: '/store/categories',
      ORDERS: '/store/orders',
    },
    MAPS: {
      BASE: '/maps',
      LOCATIONS: '/maps/locations',
      WEATHER: '/maps/weather',
      ENVIRONMENT: '/maps/environment',
    },
    ACHIEVEMENTS: {
      BASE: '/achievements',
      USER_ACHIEVEMENTS: '/achievements/user',
      UNLOCK: '/achievements/unlock',
    },
  },
} as const;

export const ENV_CONFIG = {
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
  USE_MOCK_DATA: __DEV__,
} as const;
