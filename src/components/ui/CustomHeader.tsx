import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useHaptic } from '@/hooks';
import { useTheme } from '@/theme';
import { Body1, Heading2 } from './Typography';

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  variant?: 'gradient' | 'solid' | 'glass';
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  rightIcon,
  onRightPress,
  variant = 'gradient'
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { light } = useHaptic();

  const handleBackPress = () => {
    light();
    router.back();
  };

  const handleRightPress = () => {
    light();
    onRightPress?.();
  };

  const renderContent = () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.base,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.base,
      minHeight: 60,
    }}>
      {/* Left Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {showBackButton && (
          <Pressable
            onPress={handleBackPress}
            style={{
              marginRight: theme.spacing.sm,
              padding: theme.spacing.xs,
              borderRadius: theme.border.radius.md,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Feather name="arrow-left" size={20} color={theme.colors.white} />
          </Pressable>
        )}
        
        <View style={{ flex: 1 }}>
          <Heading2 color={theme.colors.white} style={{ marginBottom: subtitle ? 2 : 0 }}>
            {title}
          </Heading2>
          {subtitle && (
            <Body1 color="rgba(255, 255, 255, 0.8)" style={{ fontSize: 14 }}>
              {subtitle}
            </Body1>
          )}
        </View>
      </View>

      {/* Right Section */}
      {rightIcon && (
        <Pressable
          onPress={handleRightPress}
          style={{
            padding: theme.spacing.xs,
            borderRadius: theme.border.radius.md,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Feather name={rightIcon as any} size={20} color={theme.colors.white} />
        </Pressable>
      )}
    </View>
  );

  if (variant === 'gradient') {
    return (
      <Animated.View entering={FadeInDown.duration(600)}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <LinearGradient
          colors={['#34d399', '#10b981']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top,
          }}
        >
          {renderContent()}
        </LinearGradient>
      </Animated.View>
    );
  }

  if (variant === 'glass') {
    return (
      <Animated.View entering={FadeInDown.duration(600)}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={{
          paddingTop: insets.top,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.base,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.base,
            minHeight: 60,
          }}>
            {/* Left Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {showBackButton && (
                <Pressable
                  onPress={handleBackPress}
                  style={{
                    marginRight: theme.spacing.sm,
                    padding: theme.spacing.xs,
                    borderRadius: theme.border.radius.md,
                    backgroundColor: theme.colors.neutral20,
                  }}
                >
                  <Feather name="arrow-left" size={20} color={theme.colors.neutral100} />
                </Pressable>
              )}
              
              <View style={{ flex: 1 }}>
                <Heading2 color={theme.colors.neutral100} style={{ marginBottom: subtitle ? 2 : 0 }}>
                  {title}
                </Heading2>
                {subtitle && (
                  <Body1 color={theme.colors.neutral60} style={{ fontSize: 14 }}>
                    {subtitle}
                  </Body1>
                )}
              </View>
            </View>

            {/* Right Section */}
            {rightIcon && (
              <Pressable
                onPress={handleRightPress}
                style={{
                  padding: theme.spacing.xs,
                  borderRadius: theme.border.radius.md,
                  backgroundColor: theme.colors.neutral20,
                }}
              >
                <Feather name={rightIcon as any} size={20} color={theme.colors.neutral100} />
              </Pressable>
            )}
          </View>
        </View>
      </Animated.View>
    );
  }

  // Solid variant
  return (
    <Animated.View entering={FadeInDown.duration(600)}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.brand} />
      <View style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.brand,
      }}>
        {renderContent()}
      </View>
    </Animated.View>
  );
};
