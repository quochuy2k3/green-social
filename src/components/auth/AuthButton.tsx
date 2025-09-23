import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { makeStyles, useTheme } from '@/theme';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export function AuthButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
}: AuthButtonProps) {
  const theme = useTheme();
  const styles = useStyles({ theme });

  const isDisabled = disabled || loading;
  const buttonStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const textColor = variant === 'primary' ? theme.colors.white : theme.colors.neutral100;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[buttonStyle, isDisabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDisabled ? ['#9ca3af', '#6b7280'] : ['#10b981', '#34d399']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {icon && <>{icon}</>}
          <Typography variant="body1" weight="bold" color={textColor}>
            {loading ? 'Đang xử lý...' : title}
          </Typography>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {icon && <>{icon}</>}
      <Typography variant="body1" weight="semibold" color={textColor}>
        {loading ? 'Đang xử lý...' : title}
      </Typography>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  primaryButton: {
    borderRadius: theme.border.radius.lg,
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.lg,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1.5,
    borderColor: theme.colors.neutral20,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonDisabled: {
    shadowOpacity: 0.1,
    elevation: 1,
  },
  buttonGradient: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
  },
}));
