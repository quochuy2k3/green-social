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
import type { UserCreate } from '@/types/api';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const theme = useTheme();
  const styles = useStyles({ theme });
  const { register, isLoading, error, clearError } = useAuth();
  const { validateRegister, getFieldError, clearErrors } = useFormValidation();

  const [formData, setFormData] = useState<UserCreate>({
    email: '',
    username: '',
    password: '',
    full_name: undefined,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof UserCreate, value: string) => {
    setFormData((prev: UserCreate) => ({ ...prev, [field]: value }));
    if (error) clearError();
    clearErrors();
  };

  const handleRegister = async () => {
    const validation = validateRegister(formData);
    if (!validation.success) {
      return;
    }

    if (formData.password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData);
    } catch (error) {
      // Error is already handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.back();
  };




  const isFormValid = 
    formData.email.trim().length > 0 &&
    formData.username.trim().length > 0 &&
    formData.password.trim().length >= 6 &&
    confirmPassword.trim().length > 0 &&
    formData.password === confirmPassword;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#10b981', '#34d399', '#6ee7b7']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
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
                <TouchableOpacity style={styles.backButton} onPress={handleLogin}>
                  <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                
                <View style={styles.logoContainer}>
                  <View style={styles.logo}>
                    <Ionicons name="leaf" size={40} color={theme.colors.white} />
                  </View>
                  <Typography variant="h2" weight="bold" color={theme.colors.white} style={styles.title}>
                    Tạo tài khoản
                  </Typography>
                  <Typography variant="body2" color={theme.colors.white} style={styles.subtitle}>
                    Tham gia cộng đồng xanh và bắt đầu hành trình của bạn
                  </Typography>
                </View>
              </View>

              {/* Form Card */}
              <View style={styles.formCard}>
                <View style={styles.form}>
                  {/* Full Name Input */}
                  <FormInput
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                    value={formData.full_name || ''}
                    onChangeText={(value) => handleInputChange('full_name', value)}
                    icon="person-outline"
                    autoCapitalize="words"
                    autoCorrect={false}
                    validationError={getFieldError('full_name')}
                  />

                  {/* Email Input */}
                  <FormInput
                    label="Email"
                    placeholder="Nhập email"
                    value={formData.email || ''}
                    onChangeText={(value) => handleInputChange('email', value)}
                    icon="mail-outline"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    validationError={getFieldError('email')}
                  />

                  {/* Username Input */}
                  <FormInput
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username || ''}
                    onChangeText={(value) => handleInputChange('username', value)}
                    icon="at-outline"
                    autoCapitalize="none"
                    autoCorrect={false}
                    validationError={getFieldError('username')}
                  />

                  {/* Password Input */}
                  <FormInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
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

                  {/* Confirm Password Input */}
                  <FormInput
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    icon="lock-closed-outline"
                    secureTextEntry={!showConfirmPassword}
                    showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={confirmPassword.length > 0 && formData.password !== confirmPassword ? 'Mật khẩu xác nhận không khớp' : ''}
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


                  {/* Register Button */}
                  <AuthButton
                    title="Tạo tài khoản"
                    onPress={handleRegister}
                    disabled={!isFormValid}
                    loading={isSubmitting}
                    variant="primary"
                  />

                  {/* Login Link */}
                  <View style={styles.loginContainer}>
                    <Typography variant="body2" color={theme.colors.neutral60}>
                      Đã có tài khoản?{' '}
                    </Typography>
                    <TouchableOpacity onPress={handleLogin}>
                      <Typography variant="body2" color={theme.colors.brand90} weight="bold">
                        Đăng nhập ngay
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
  loginContainer: {
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
