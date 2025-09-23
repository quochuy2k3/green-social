import { useHaptic } from '@/hooks';
import { makeStyles, useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'gradient';
  disabled?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'add',
  size = 'medium',
  variant = 'gradient',
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = useStyles({ theme, size, variant, disabled });
  const { light, medium } = useHaptic();
  
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = () => {
    if (disabled) return;
    
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    rotation.value = withSpring(5, { damping: 15, stiffness: 300 });
    light();
  };

  const handlePressOut = () => {
    if (disabled) return;
    
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    rotation.value = withSpring(0, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    if (disabled) return;
    
    medium();
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const getIconSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 28;
      default: return 24;
    }
  };

  const getButtonContent = () => {
    const iconSize = getIconSize();
    const iconColor = disabled ? theme.colors.neutral50 : theme.colors.white;

    if (variant === 'gradient') {
      return (
        <LinearGradient
          colors={disabled ? [theme.colors.neutral30, theme.colors.neutral40] : ['#34d399', '#10b981']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon} size={iconSize} color={iconColor} />
        </LinearGradient>
      );
    }

    return (
      <View style={styles.solidButton}>
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      </View>
    );
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
    >
      {getButtonContent()}
    </AnimatedTouchableOpacity>
  );
};

const useStyles = makeStyles((theme, { size, variant, disabled }) => {
  const getButtonSize = () => {
    switch (size) {
      case 'small': return 48;
      case 'large': return 64;
      default: return 56;
    }
  };

  const buttonSize = getButtonSize();

  return {
    container: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: disabled ? 0.1 : 0.3,
      shadowRadius: 8,
      elevation: disabled ? 2 : 8,
    },
    gradientButton: {
      width: '100%',
      height: '100%',
      borderRadius: buttonSize / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    solidButton: {
      width: '100%',
      height: '100%',
      borderRadius: buttonSize / 2,
      backgroundColor: disabled ? theme.colors.neutral30 : theme.colors.brand90,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});
