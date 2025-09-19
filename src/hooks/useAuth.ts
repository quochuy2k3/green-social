import { useServices } from '@/services/ServicesProvider';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useAuth() {
  const { AuthService } = useServices();
  const queryClient = useQueryClient();

  // Get user profile
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => AuthService.getProfile(),
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      // Update user profile in cache
      queryClient.setQueryData(['user', 'profile'], data.user);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data: AuthResponse) => {
      // Update user profile in cache
      queryClient.setQueryData(['user', 'profile'], data.user);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (profileData: UpdateProfileRequest) => AuthService.updateProfile(profileData),
    onSuccess: (updatedUser: User) => {
      // Update user profile in cache
      queryClient.setQueryData(['user', 'profile'], updatedUser);
    },
  });

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (imageUri: string) => AuthService.uploadAvatar(imageUri),
    onSuccess: (data) => {
      // Update user profile with new avatar
      queryClient.setQueryData(['user', 'profile'], (oldData: User | undefined) => {
        if (oldData) {
          return { ...oldData, avatar: data.avatar };
        }
        return oldData;
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });

  return {
    // User data
    user,
    isLoadingUser,
    userError,
    isAuthenticated: !!user,

    // Mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,

    uploadAvatar: uploadAvatarMutation.mutate,
    uploadAvatarAsync: uploadAvatarMutation.mutateAsync,
    isUploadingAvatar: uploadAvatarMutation.isPending,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateProfileError: updateProfileMutation.error,
    uploadAvatarError: uploadAvatarMutation.error,
    logoutError: logoutMutation.error,
  };
}
