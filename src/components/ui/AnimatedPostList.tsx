import { useTheme } from '@/theme';
import type { PostResponse } from '@/types';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';
import { PostCard } from './PostCard';

interface AnimatedPostListProps {
  posts: PostResponse[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUserPress: (userId: string) => void;
  onImagePress: (imageId: string) => void;
  onLoadMore?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<PostResponse>);

// Separate component for animated post item to avoid hooks in render function
const AnimatedPostItem = React.memo(({ 
  item, 
  index, 
  onLike, 
  onComment, 
  onShare, 
  onUserPress, 
  onImagePress 
}: { 
  item: PostResponse; 
  index: number;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUserPress: (userId: string) => void;
  onImagePress: (imageId: string) => void;
}) => {
  const animatedValue = useSharedValue(0);
  
  React.useEffect(() => {
    animatedValue.value = withDelay(
      index * 100,
      withSpring(1, { damping: 15, stiffness: 300 })
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [0, 1],
      [50, 0],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      animatedValue.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    const scale = interpolate(
      animatedValue.value,
      [0, 1],
      [0.95, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateY },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PostCard
        post={item}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onUserPress={onUserPress}
        onImagePress={onImagePress}
      />
    </Animated.View>
  );
});

export const AnimatedPostList: React.FC<AnimatedPostListProps> = ({
  posts,
  onLike,
  onComment,
  onShare,
  onUserPress,
  onImagePress,
  onLoadMore,
  refreshing = false,
  onRefresh,
}) => {
  const theme = useTheme();
  
  const renderPost: ListRenderItem<PostResponse> = ({ item, index }) => {
    return (
      <AnimatedPostItem
        item={item}
        index={index}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onUserPress={onUserPress}
        onImagePress={onImagePress}
      />
    );
  };

  return (
    <AnimatedFlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{
        paddingBottom: theme.spacing['2xl'],
      }}
    />
  );
};