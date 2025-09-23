import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton, FormInput } from '@/components/auth';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useFormValidation } from '@/hooks/useFormValidation';
import { makeStyles, useTheme } from '@/theme';
import type { LoginRequest } from '@/types';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const theme = useTheme();
  const styles = useStyles({ theme });
  const { login, isLoading, error, clearError } = useAuth();
  const { validateLogin, getFieldError, clearErrors } = useFormValidation();

  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof LoginRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
    clearErrors(); // Clear validation errors when user types
  };

  const handleLogin = async () => {
    // Validate form data using schema
    const validation = validateLogin(formData);
    if (!validation.success) {
      // Validation errors are already displayed in the form
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData);
      // Navigation will be handled by AuthProvider
    } catch (error) {
      // Error is already handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Tính năng đăng nhập Google sẽ được phát triển');
  };

  const handleForgotPassword = () => {
    Alert.alert('Quên mật khẩu', 'Tính năng khôi phục mật khẩu sẽ được phát triển');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };


  const isFormValid = formData.username.trim().length > 0 && formData.password.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#10b981', '#34d399', '#6ee7b7']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
        
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                
                <View style={styles.logoContainer}>
                  <View style={styles.logo}>
                    <Ionicons name="leaf" size={40} color={theme.colors.white} />
                  </View>
                  <Typography variant="h2" weight="bold" color={theme.colors.white} style={styles.title}>
                    Chào mừng trở lại
                  </Typography>
                  <Typography variant="body2" color={theme.colors.white} style={styles.subtitle}>
                    Đăng nhập để tiếp tục hành trình xanh của bạn
                  </Typography>
                </View>
              </View>

              {/* Form Card */}
              <View style={styles.formCard}>
                <View style={styles.form}>
                  {/* Username Input */}
                  <FormInput
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username || ''}
                    onChangeText={(value) => handleInputChange('username', value)}
                    icon="person-outline"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    validationError={getFieldError('username')}
                  />

                  {/* Password Input */}
                  <FormInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={formData.password || ''}
                    onChangeText={(value) => handleInputChange('password', value)}
                    icon="lock-closed-outline"
                    secureTextEntry={!showPassword}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    validationError={getFieldError('password')}
                  />

                  {/* Error Message */}
                  {error && (
                    <View style={styles.errorContainer}>
                      <Ionicons name="alert-circle" size={16} color={theme.colors.error100} />
                      <Typography variant="caption" color={theme.colors.error100} style={styles.errorText}>
                        {error}
                      </Typography>
                    </View>
                  )}

                  {/* Forgot Password */}
                  <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                    <Typography variant="caption" color={theme.colors.brand90} weight="semibold">
                      Quên mật khẩu?
                    </Typography>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <AuthButton
                    title="Đăng nhập"
                    onPress={handleLogin}
                    disabled={!isFormValid}
                    loading={isSubmitting}
                    variant="primary"
                  />

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Typography variant="caption" color={theme.colors.neutral50} style={styles.dividerText}>
                      hoặc
                    </Typography>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Google Login Button */}
                  <AuthButton
                    title="Đăng nhập với Google"
                    onPress={handleGoogleLogin}
                    variant="secondary"
                    icon={<Ionicons name="logo-google" size={20} color="#4285F4" style={{ marginRight: 8 }} />}
                  />

                  {/* Register Link */}
                  <View style={styles.registerContainer}>
                    <Typography variant="body2" color={theme.colors.neutral60}>
                      Chưa có tài khoản?{' '}
                    </Typography>
                    <TouchableOpacity onPress={handleRegister}>
                      <Typography variant="body2" color={theme.colors.brand90} weight="bold">
                        Đăng ký ngay
                      </Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: height * 0.3,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  formCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.xl,
    marginHorizontal: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  form: {
    paddingTop: theme.spacing.sm,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.error10,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.border.radius.sm,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.error100,
  },
  errorText: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.neutral20,
  },
  dividerText: {
    marginHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.sm,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing.sm,
  },
  header: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.border.radius.full,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
}));
