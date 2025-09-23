import { authService } from '@/services/auth.service';
import type { UserCreate } from '@/types/api';
import { Token, UserProfile } from '@/types/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (data: { email: string; username: string; password: string; full_name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = '@green_social_auth';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      setIsLoading(true);
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      
      if (storedAuth) {
        const authData: Token = JSON.parse(storedAuth);
        setAuthData(authData);
      }
    } catch (err) {
      setError('Failed to load authentication data');
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthData = (authData: Token) => {
    setUser(authData.user);
    setError(null);
    
    authService.setToken(authData.access_token);

    AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const authData = await authService.login(credentials);
      setAuthData(authData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: UserCreate) => {
    try {
      setIsLoading(true);
      setError(null);
      const authData = await authService.register(data);
      setAuthData(authData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      
      setUser(null);
      setError(null);
      
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      setUser(null);
      setError(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
