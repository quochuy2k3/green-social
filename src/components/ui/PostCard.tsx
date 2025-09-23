import { makeStyles, useTheme } from '@/theme';
import type { PostResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { Typography } from './Typography';

interface PostCardProps {
  post: PostResponse;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onUserPress?: (userId: string) => void;
  onImagePress?: (imageUrl: string) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onUserPress,
  onImagePress,
}) => {
  const theme = useTheme();
  const styles = useStyles({ theme });
  
  const [isLiked, setIsLiked] = useState(!!post.user_reaction);
  const [likesCount, setLikesCount] = useState(
    Object.values(post.reaction_counts).reduce((sum, count) => sum + count, 0)
  );
  
  const heartScale = useSharedValue(1);
  const commentScale = useSharedValue(1);
  const shareScale = useSharedValue(1);

  const handleLike = () => {
    heartScale.value = withSpring(1.3, { damping: 8 }, () => {
      heartScale.value = withSpring(1);
    });
    
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const handleComment = () => {
    commentScale.value = withSpring(1.2, { damping: 10 }, () => {
      commentScale.value = withSpring(1);
    });
    onComment?.(post.id);
  };

  const handleShare = () => {
    shareScale.value = withSpring(1.2, { damping: 10 }, () => {
      shareScale.value = withSpring(1);
    });
    onShare?.(post.id);
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const commentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: commentScale.value }],
  }));

  const shareAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={() => onUserPress?.(post.user_obj.id)}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color={theme.colors.brand90} />
          </View>
          <View style={styles.userDetails}>
            <Typography variant="body1" weight="semibold" color={theme.colors.neutral100}>
              Người dùng {post.user_obj.id.slice(-4)}
            </Typography>
            <Typography variant="caption" color={theme.colors.neutral60}>
              {formatTimeAgo(post.created_at)}
            </Typography>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.neutral60} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Typography variant="body1" color={theme.colors.neutral100} style={styles.postText}>
          {post.content}
        </Typography>
      </View>

      {/* Images */}
      {post.image_upload_urls && post.image_upload_urls.length > 0 && (
        <View style={styles.imagesContainer}>
          {post.image_upload_urls.slice(0, 3).map((imageUrl: string, index: number) => (
            <TouchableOpacity
              key={imageUrl}
              style={[
                styles.imageWrapper,
                post.image_upload_urls.length === 1 && styles.singleImage,
                post.image_upload_urls.length === 2 && styles.doubleImage,
                post.image_upload_urls.length > 2 && styles.tripleImage,
              ]}
              onPress={() => onImagePress?.(imageUrl)}
            >
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image" size={32} color={theme.colors.neutral40} />
              </View>
              {post.image_upload_urls.length > 3 && index === 2 && (
                <View style={styles.moreImagesOverlay}>
                  <Typography variant="caption" color={theme.colors.white} weight="bold">
                    +{post.image_upload_urls.length - 3}
                  </Typography>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Location */}
      {post.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={theme.colors.neutral60} />
          <Typography variant="caption" color={theme.colors.neutral60} style={styles.locationText}>
            {post.location.latitude.toFixed(4)}, {post.location.longitude.toFixed(4)}
          </Typography>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <AnimatedTouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Animated.View style={heartAnimatedStyle}>
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={20} 
              color={isLiked ? theme.colors.error100 : theme.colors.neutral60} 
            />
          </Animated.View>
          <Typography variant="caption" color={theme.colors.neutral60} style={styles.actionText}>
            {likesCount}
          </Typography>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity 
          style={styles.actionButton}
          onPress={handleComment}
        >
          <Animated.View style={commentAnimatedStyle}>
            <Ionicons name="chatbubble-outline" size={20} color={theme.colors.neutral60} />
          </Animated.View>
          <Typography variant="caption" color={theme.colors.neutral60} style={styles.actionText}>
            {post.comments.length}
          </Typography>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Animated.View style={shareAnimatedStyle}>
            <Ionicons name="share-outline" size={20} color={theme.colors.neutral60} />
          </Animated.View>
          <Typography variant="caption" color={theme.colors.neutral60} style={styles.actionText}>
            Chia sẻ
          </Typography>
        </AnimatedTouchableOpacity>
      </View>

      {/* Comments Preview */}
      {post.comments.length > 0 && (
        <View style={styles.commentsPreview}>
          {post.comments.slice(0, 2).map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Typography variant="caption" color={theme.colors.neutral100} weight="semibold">
                Người dùng {comment.user_obj.id.slice(-4)}: 
              </Typography>
              <Typography variant="caption" color={theme.colors.neutral80} style={styles.commentText}>
                {comment.content}
              </Typography>
            </View>
          ))}
          {post.comments.length > 2 && (
            <TouchableOpacity onPress={() => onComment?.(post.id)}>
              <Typography variant="caption" color={theme.colors.brand90} weight="semibold">
                Xem thêm {post.comments.length - 2} bình luận
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.border.radius.xl,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.brand50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  userDetails: {
    flex: 1,
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  content: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  postText: {
    lineHeight: 22,
  },
  imagesContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  imageWrapper: {
    borderRadius: theme.border.radius.base,
    overflow: 'hidden',
  },
  singleImage: {
    width: '100%',
    height: 200,
  },
  doubleImage: {
    flex: 1,
    height: 150,
  },
  tripleImage: {
    flex: 1,
    height: 120,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: theme.colors.neutral20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreImagesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  locationText: {
    marginLeft: theme.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  actionText: {
    marginLeft: theme.spacing.xs,
  },
  commentsPreview: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral20,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  commentText: {
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
}));
