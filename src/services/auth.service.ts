import {
  GoogleAuthRequest,
  LoginRequest,
  Token,
  UserCreate,
  UserProfile
} from '@/types/api';
import apiClient, { setAuthToken } from './api';

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: UserCreate): Promise<Token> {
    const response = await apiClient.post<Token>('/auth/register', userData);
    return response.data;
  }

  /**
   * Login with username and password
   */
  async login(credentials: LoginRequest): Promise<Token> {
    // Convert to form data format for OAuth2
    const formData = new URLSearchParams();
    formData.append('grant_type', credentials.grant_type || 'password');
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    formData.append('scope', credentials.scope || '');
    formData.append('client_id', credentials.client_id || 'string');
    formData.append('client_secret', credentials.client_secret || '********');
    
    const response = await apiClient.post<Token>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  }

  /**
   * Google authentication
   */
  async googleAuth(googleData: GoogleAuthRequest): Promise<Token> {
    const response = await apiClient.post<Token>('/auth/google', googleData);
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/users/me');
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>('/users/me', userData);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear token from storage and axios headers
    setAuthToken(null);
    // Note: API doesn't have logout endpoint, so we just clear local token
  }

  /**
   * Set authentication token
   */
  setToken(token: string): void {
    setAuthToken(token);
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    setAuthToken(null);
  }
}

export const authService = new AuthService();