export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'https://mamxanh-api.voca.io.vn' : 'https://mamxanh-api.voca.io.vn',
  PRODUCTION_URL: 'https://mamxanh-api.voca.io.vn',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  ENABLE_LOG: __DEV__,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      GOOGLE: '/auth/google',
    },
    USERS: {
      ME: '/users/me',
      LEADERBOARD: '/users/leaderboard',
      USER_BY_ID: '/users/{user_id}',
    },
    POSTS: {
      BASE: '/posts/',
      POST_BY_ID: '/posts/{post_id}',
      USER_POSTS: '/posts/user/{user_id}',
      REACTIONS: '/posts/{post_id}/reactions',
      COMMENTS: '/posts/{post_id}/comments',
      COMMENT_BY_ID: '/posts/{post_id}/comments/{comment_id}',
    },
    STORAGE: {
      UPLOAD: '/storage/upload',
      FILE_BY_ID: '/storage/files/{upload_id}',
      FILE_INFO: '/storage/files/{upload_id}/info',
    },
    HEAT_REPORTS: {
      BASE: '/heat-reports/',
      HEATMAP: '/heat-reports/heatmap',
      USER_REPORTS: '/heat-reports/user/{user_id}',
      REPORT_BY_ID: '/heat-reports/{report_id}',
    },
    GREEN_MAP: {
      BASE: '/green-map/',
      TYPES: '/green-map/types',
      SEARCH: '/green-map/search',
      LOCATION_BY_ID: '/green-map/{location_id}',
    },
    ACHIEVEMENTS: {
      BASE: '/achievements/',
      USER: '/achievements/user',
      CHECK: '/achievements/check',
      BY_ID: '/achievements/{achievement_id}',
    },
    NOTIFICATIONS: {
      BASE: '/notifications/',
      UNREAD_COUNT: '/notifications/unread-count',
      MARK_READ: '/notifications/{notification_id}/read',
      MARK_ALL_READ: '/notifications/mark-all-read',
      BY_ID: '/notifications/{notification_id}',
    },
    WEATHER: {
      CURRENT: '/weather/current',
      FORECAST: '/weather/forecast',
      CITIES: '/weather/cities',
    },
    GREEN_POINTS: {
      HISTORY: '/green-points/history',
      SUMMARY: '/green-points/summary',
      DAILY_BONUS: '/green-points/daily-bonus',
    },
    STATISTICS: {
      LEADERBOARD: '/statistics/leaderboard',
      USER_STATISTICS: '/statistics/user/{user_id}',
      USER_RANK: '/statistics/user/{user_id}/rank',
      MY_STATISTICS: '/statistics/me',
      TOP_CONTRIBUTORS: '/statistics/top-contributors',
    },
    HEALTH: {
      ROOT: '/',
      HEALTH: '/health',
    },
  },
} as const;

export const ENV_CONFIG = {
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
} as const;
