import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { makeStyles, useTheme } from '@/theme';

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
  autoCorrect?: boolean;
  error?: string;
  validationError?: string;
}

export function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  showPassword = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  error,
  validationError,
}: FormInputProps) {
  const theme = useTheme();
  const styles = useStyles({ theme });

  const hasError = error || validationError;
  const errorMessage = error || validationError;

  return (
    <View style={styles.container}>
      <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.label}>
        {label}
      </Typography>
      <View style={[styles.inputWrapper, hasError && styles.inputWrapperError]}>
        <Ionicons name={icon} size={20} color={theme.colors.brand90} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.neutral50}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        {onTogglePassword && (
          <TouchableOpacity style={styles.passwordToggle} onPress={onTogglePassword}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.colors.neutral50}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && errorMessage.length > 0 && (
        <Typography variant="caption" color={theme.colors.error100} style={styles.errorText}>
          {errorMessage}
        </Typography>
      )}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1.5,
    borderColor: theme.colors.neutral20,
  },
  inputWrapperError: {
    borderColor: theme.colors.error100,
    backgroundColor: theme.colors.error10,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.neutral100,
    paddingVertical: 0,
  },
  passwordToggle: {
    padding: theme.spacing.xs,
  },
  errorText: {
    marginTop: theme.spacing.xs,
  },
}));
