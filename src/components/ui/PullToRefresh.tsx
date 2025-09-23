import React from 'react';
import { View, RefreshControl } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Typography } from './Typography';

interface PullToRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshing,
  onRefresh,
  children,
}) => {
  const theme = useTheme();
  const pullDistance = useSharedValue(0);
  const isRefreshing = useSharedValue(false);

  React.useEffect(() => {
    isRefreshing.value = refreshing;
  }, [refreshing]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      pullDistance.value,
      [0, 100],
      [0, 50],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      pullDistance.value,
      [0, 50],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const refreshIndicatorStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pullDistance.value,
      [0, 100],
      [0.5, 1],
      Extrapolate.CLAMP
    );

    const rotation = interpolate(
      pullDistance.value,
      [0, 100],
      [0, 360],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { scale },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Refresh Indicator */}
      <Animated.View style={[styles.refreshIndicator, animatedStyle]}>
        <LinearGradient
          colors={[theme.colors.brand90, theme.colors.brand100]}
          style={styles.refreshGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View style={refreshIndicatorStyle}>
            <Ionicons name="refresh" size={24} color={theme.colors.white} />
          </Animated.View>
          <Typography variant="body2" weight="semibold" color={theme.colors.white} style={styles.refreshText}>
            Kéo để làm mới
          </Typography>
        </LinearGradient>
      </Animated.View>

      {/* Content with RefreshControl */}
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={theme.colors.brand90}
        colors={[theme.colors.brand90]}
        progressBackgroundColor={theme.colors.white}
        title="Đang làm mới..."
        titleColor={theme.colors.neutral60}
      >
        {children}
      </RefreshControl>
    </View>
  );
};

const styles = {
  refreshIndicator: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  refreshGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  refreshText: {
    marginLeft: 8,
  },
};
