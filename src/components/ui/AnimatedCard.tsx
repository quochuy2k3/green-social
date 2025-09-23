import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'glass' | 'gradient';
  onPress?: () => void;
  hapticFeedback?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  variant = 'default',
  onPress,
  hapticFeedback = true,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getCardContent = () => {
    switch (variant) {
      case 'glass':
        return (
          <BlurView intensity={20} style={[styles.card, styles.glassCard, style]}>
            {children}
          </BlurView>
        );
      case 'gradient':
        return (
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={[styles.card, styles.gradientCard, style]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {children}
          </LinearGradient>
        );
      default:
        return (
          <View style={[styles.card, styles.defaultCard, style]}>
            {children}
          </View>
        );
    }
  };

  if (onPress) {
    return (
      <AnimatedView style={animatedStyle}>
        <AnimatedView
          onTouchStart={handlePressIn}
          onTouchEnd={handlePressOut}
          onPress={onPress}
        >
          {getCardContent()}
        </AnimatedView>
      </AnimatedView>
    );
  }

  return (
    <AnimatedView style={[animatedStyle, style]}>
      {getCardContent()}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  gradientCard: {
    backgroundColor: 'transparent',
  },
});

