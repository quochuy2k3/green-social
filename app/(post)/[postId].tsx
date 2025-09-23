import { PostCard } from '@/components/ui/PostCard';
import { Typography } from '@/components/ui/Typography';
import { useCommunity } from '@/hooks';
import { makeStyles, useTheme } from '@/theme';
import type { PostResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const theme = useTheme();
  const styles = useStyles({ theme });
  
  const [post, setPost] = useState<PostResponse | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  const {
    loadPosts,
    addComment,
    addReaction,
    removeReaction,
  } = useCommunity();

  useEffect(() => {
    loadPostDetail();
  }, [postId]);

  const loadPostDetail = async () => {
    try {
      setIsLoading(true);
      // Use real API to get single post
      const { CommunityService } = await import('@/services');
      const communityService = new CommunityService();
      const postData = await communityService.getPost(postId);
      setPost(postData);
    } catch (error) {
      console.error('Error loading post detail:', error);
      Alert.alert('Lỗi', 'Không thể tải chi tiết bài viết');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadPostDetail();
    setIsRefreshing(false);
  };

  const handleLike = async () => {
    if (!post) return;
    
    try {
      if (post.user_reaction) {
        await removeReaction(post.id);
      } else {
        await addReaction(post.id, 'like');
      }
      // Refresh post data
      await loadPostDetail();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thực hiện hành động này');
    }
  };

  const handleComment = async () => {
    if (!post || !newComment.trim()) return;
    
    try {
      setIsSubmittingComment(true);
      await addComment(post.id, newComment.trim());
      setNewComment('');
      // Refresh post data
      await loadPostDetail();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm bình luận');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = () => {
    Alert.alert('Chia sẻ', 'Tính năng chia sẻ sẽ được phát triển');
  };

  const handleUserPress = (userId: string) => {
    router.push(`/(home)/profile/${userId}`);
  };

  const handleImagePress = (imageId: string) => {
    Alert.alert('Hình ảnh', `Xem hình ảnh: ${imageId}`);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.brand90} />
        <Typography variant="body1" color={theme.colors.neutral60} style={styles.loadingText}>
          Đang tải...
        </Typography>
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={theme.colors.error100} />
        <Typography variant="h3" weight="bold" color={theme.colors.neutral100} style={styles.errorTitle}>
          Không tìm thấy bài viết
        </Typography>
        <Typography variant="body1" color={theme.colors.neutral60} style={styles.errorMessage}>
          Bài viết có thể đã bị xóa hoặc không tồn tại
        </Typography>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Typography variant="body1" weight="semibold" color={theme.colors.brand90}>
            Quay lại
          </Typography>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.neutral100} />
        </TouchableOpacity>
        
        <Typography variant="h3" weight="bold" color={theme.colors.neutral100}>
          Bài viết
        </Typography>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={theme.colors.neutral100} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.brand90]}
            tintColor={theme.colors.brand90}
          />
        }
      >
        {/* Post Content */}
        <PostCard
          post={post}
          onLike={handleLike}
          onComment={() => {}} // No-op since we're already in detail view
          onShare={handleShare}
          onUserPress={handleUserPress}
          onImagePress={handleImagePress}
        />

        {/* Heat Report Info */}
        {post.is_heat_report && (
          <View style={styles.heatReportInfo}>
            <View style={styles.heatReportHeader}>
              <Ionicons name="thermometer" size={20} color={theme.colors.error100} />
              <Typography variant="body2" weight="semibold" color={theme.colors.neutral100}>
                Báo cáo nhiệt độ
              </Typography>
            </View>
            
            <View style={styles.heatReportDetails}>
              {post.temperature && (
                <View style={styles.temperatureInfo}>
                  <Typography variant="caption" color={theme.colors.neutral60}>
                    Nhiệt độ:
                  </Typography>
                  <Typography variant="body2" weight="semibold" color={theme.colors.error100}>
                    {post.temperature}°C
                  </Typography>
                </View>
              )}
              
              {post.heat_severity && (
                <View style={styles.severityInfo}>
                  <Typography variant="caption" color={theme.colors.neutral60}>
                    Mức độ:
                  </Typography>
                  <View style={[
                    styles.severityBadge,
                    post.heat_severity === 'high' && styles.severityBadgeHigh,
                    post.heat_severity === 'medium' && styles.severityBadgeMedium,
                    post.heat_severity === 'low' && styles.severityBadgeLow,
                  ]}>
                    <Typography variant="caption" weight="semibold" color={theme.colors.white}>
                      {post.heat_severity === 'high' ? 'Cao' : 
                       post.heat_severity === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Typography>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Typography variant="h4" weight="bold" color={theme.colors.neutral100} style={styles.commentsTitle}>
            Bình luận ({post.comments.length})
          </Typography>

          {/* Comments List */}
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <View style={styles.commentAvatar}>
                  <Ionicons name="person" size={16} color={theme.colors.brand90} />
                </View>
                <Typography variant="body2" weight="semibold" color={theme.colors.neutral100}>
                  {comment.user_obj.username}
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral50}>
                  {new Date(comment.created_at).toLocaleDateString('vi-VN')}
                </Typography>
              </View>
              <Typography variant="body2" color={theme.colors.neutral80} style={styles.commentContent}>
                {comment.content}
              </Typography>
            </View>
          ))}

          {/* Add Comment Input */}
          <View style={styles.addCommentContainer}>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Viết bình luận..."
                placeholderTextColor={theme.colors.neutral50}
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!newComment.trim() || isSubmittingComment) && styles.sendButtonDisabled,
                ]}
                onPress={handleComment}
                disabled={!newComment.trim() || isSubmittingComment}
              >
                {isSubmittingComment ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Ionicons name="send" size={16} color={theme.colors.white} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  loadingText: {
    marginTop: theme.spacing.base,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.xl,
  },
  errorTitle: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral20,
    backgroundColor: theme.colors.white,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  shareButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  heatReportInfo: {
    margin: theme.spacing.base,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral20,
  },
  heatReportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  heatReportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  severityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  severityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.border.radius.full,
  },
  severityBadgeHigh: {
    backgroundColor: theme.colors.error100,
  },
  severityBadgeMedium: {
    backgroundColor: theme.colors.warning100,
  },
  severityBadgeLow: {
    backgroundColor: theme.colors.success100,
  },
  commentsSection: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral20,
  },
  commentsTitle: {
    marginBottom: theme.spacing.lg,
  },
  commentItem: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.neutral10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  commentContent: {
    lineHeight: 20,
  },
  addCommentContainer: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.neutral100,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.brand90,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.neutral30,
  },
}));
