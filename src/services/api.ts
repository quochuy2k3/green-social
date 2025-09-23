import { API_CONFIG } from '@/constants';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Platform } from 'react-native';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
  withCredentials: false,
  // iOS-specific configuration
  validateStatus: (status) => status >= 200 && status < 300,
  maxRedirects: 0,
  adapter: Platform.OS === 'ios' ? undefined : undefined,
});


apiClient.interceptors.request.use(
  (config) => {
    if (Platform.OS === 'ios') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (Platform.OS === 'ios' && error.code === 'NETWORK_ERROR') {
      console.warn('iOS Network Error detected, retrying...');
    }
    return Promise.reject(error);
  }
);


let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const setLanguage = (language: string) => {
  apiClient.defaults.headers.common['lang'] = language;
};

export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        requestFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
      ]);
      return result as T;
    } catch (error: any) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  throw new Error('Max retries exceeded');
};

export default apiClient;