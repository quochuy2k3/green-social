import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme, makeStyles } from '@/theme';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const theme = useTheme();
  const styles = useStyles({ theme, width, height, borderRadius });
  
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmer.value,
      [0, 0.5, 1],
      [0.3, 0.8, 0.3]
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.skeleton, animatedStyle, style]} />
  );
};

interface PostSkeletonProps {
  showImage?: boolean;
}

export const PostSkeleton: React.FC<PostSkeletonProps> = ({ showImage = false }) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <View style={styles.postSkeleton}>
      {/* Header */}
      <View style={styles.postHeader}>
        <LoadingSkeleton width={40} height={40} borderRadius={20} />
        <View style={styles.postHeaderText}>
          <LoadingSkeleton width={120} height={16} />
          <LoadingSkeleton width={80} height={12} style={styles.postSubtitle} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.postContent}>
        <LoadingSkeleton width="100%" height={16} />
        <LoadingSkeleton width="80%" height={16} style={styles.postTextLine} />
        <LoadingSkeleton width="60%" height={16} style={styles.postTextLine} />
      </View>

      {/* Image */}
      {showImage && (
        <LoadingSkeleton width="100%" height={200} borderRadius={8} style={styles.postImage} />
      )}

      {/* Actions */}
      <View style={styles.postActions}>
        <LoadingSkeleton width={60} height={20} />
        <LoadingSkeleton width={60} height={20} />
        <LoadingSkeleton width={60} height={20} />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, { width, height, borderRadius }) => ({
  skeleton: {
    width,
    height,
    borderRadius,
    backgroundColor: theme.colors.neutral30,
  },
  postSkeleton: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.border.radius.xl,
    padding: theme.spacing.base,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  postHeaderText: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  postSubtitle: {
    marginTop: theme.spacing.xs,
  },
  postContent: {
    marginBottom: theme.spacing.base,
  },
  postTextLine: {
    marginTop: theme.spacing.xs,
  },
  postImage: {
    marginBottom: theme.spacing.base,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral20,
  },
}));
