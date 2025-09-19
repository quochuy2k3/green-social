import { API_CONFIG, ENV_CONFIG } from '@/constants';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User
} from '@/types';
import { api } from './api';
import { authMockService } from './mockService';

export class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return authMockService.login(credentials.email, credentials.password);
    }
    
    return api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
  }

  // Register user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return authMockService.register(userData);
    }
    
    return api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
  }

  // Refresh token
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return authMockService.login('test@example.com', 'password');
    }
    
    return api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
  }

  // Logout user
  async logout(): Promise<void> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve();
    }
    
    return api.post<void>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  }

  // Get user profile
  async getProfile(): Promise<User> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return authMockService.getProfile();
    }
    
    return api.get<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  }

  // Update user profile
  async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return authMockService.updateProfile(profileData);
    }
    
    return api.put<User>(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
  }

  // Upload avatar
  async uploadAvatar(imageUri: string): Promise<{ avatar: string }> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve({ avatar: 'https://via.placeholder.com/150' });
    }
    
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    return api.post<{ avatar: string }>(
      API_CONFIG.ENDPOINTS.USERS.UPLOAD_AVATAR,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}
