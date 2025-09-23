import {
    AnimatedPostList,
    FloatingActionButton,
    PostSkeleton,
    Typography
} from '@/components/ui';
import { useCommunity } from '@/hooks';
import { makeStyles, useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommunityScreen() {
  const theme = useTheme();
  const styles = useStyles({ theme });
  
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  
  const {
    posts,
    loading,
    refreshing,
    error,
    hasMore,
    loadPosts,
    createPost,
    addReaction,
    removeReaction,
    addComment,
    refreshPosts,
  } = useCommunity();

  const handleCreatePost = () => {
    router.push('/(post)/create');
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (post.user_reaction) {
      await removeReaction(postId);
    } else {
      await addReaction(postId, 'like');
    }
  };

  const handleComment = (postId: string) => {
    router.push(`/(post)/${postId}`);
  };

  const handleAddComment = async (postId: string, content: string) => {
    await addComment(postId, content);
  };

  const handleShare = (postId: string) => {
    Alert.alert('Chia sẻ', 'Tính năng chia sẻ sẽ được phát triển trong phiên bản tiếp theo');
  };

  const handleUserPress = (userId: string) => {
    router.push(`/(home)/profile/${userId}`);
  };

  const handleImagePress = (imageId: string) => {
    Alert.alert('Hình ảnh', `Xem hình ảnh ${imageId}`);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadPosts();
    }
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#34d399', '#10b981']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Typography variant="h1" weight="bold" color={theme.colors.white} style={styles.headerTitle}>
        Cộng đồng
      </Typography>
      <Typography variant="body1" color={theme.colors.white} style={styles.headerSubtitle}>
        Kết nối với cộng đồng xanh
      </Typography>
      
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Typography variant="h3" weight="bold" color={theme.colors.white}>
            {posts.length}
          </Typography>
          <Typography variant="caption" color={theme.colors.white} style={styles.statLabel}>
            Bài viết
          </Typography>
        </View>
        <View style={styles.statItem}>
          <Typography variant="h3" weight="bold" color={theme.colors.white}>
            {posts.reduce((sum, post) => sum + post.comments.length, 0)}
          </Typography>
          <Typography variant="caption" color={theme.colors.white} style={styles.statLabel}>
            Bình luận
          </Typography>
        </View>
        <View style={styles.statItem}>
          <Typography variant="h3" weight="bold" color={theme.colors.white}>
            {posts.reduce((sum, post) => sum + Object.values(post.reaction_counts).reduce((a, b) => a + b, 0), 0)}
          </Typography>
          <Typography variant="caption" color={theme.colors.white} style={styles.statLabel}>
            Tương tác
          </Typography>
        </View>
      </View>
    </LinearGradient>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="people-outline" size={64} color={theme.colors.neutral40} />
      <Typography variant="h3" weight="bold" color={theme.colors.neutral60} style={styles.emptyTitle}>
        Chưa có bài viết nào
      </Typography>
      <Typography variant="body1" color={theme.colors.neutral50} style={styles.emptyDescription}>
        Hãy là người đầu tiên chia sẻ với cộng đồng!
      </Typography>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={handleCreatePost}
      >
        <Typography variant="body1" weight="semibold" color={theme.colors.white}>
          Tạo bài viết đầu tiên
        </Typography>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingMore = () => (
    <View style={styles.loadingMore}>
      <ActivityIndicator size="small" color={theme.colors.brand90} />
      <Typography variant="caption" color={theme.colors.neutral60} style={styles.loadingText}>
        Đang tải thêm...
      </Typography>
    </View>
  );

        return (
          <SafeAreaView style={styles.container}>
            {renderHeader()}
      
      {posts.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <AnimatedPostList
          posts={posts}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onUserPress={handleUserPress}
          onImagePress={handleImagePress}
          onLoadMore={handleLoadMore}
          refreshing={refreshing}
          onRefresh={refreshPosts}
        />
      )}

      {/* Loading Skeletons */}
      {loading && posts.length === 0 && (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} showImage={index % 2 === 0} />
          ))}
        </ScrollView>
      )}


            {/* Floating Action Button */}
            <FloatingActionButton
              onPress={handleCreatePost}
              icon="add"
              size="large"
              variant="gradient"
            />
          </SafeAreaView>
        );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral20,
  },
  header: {
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    opacity: 0.9,
    marginBottom: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: theme.spacing.xs,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['2xl'],
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing['2xl'],
  },
  emptyTitle: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyDescription: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    backgroundColor: theme.colors.brand90,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.base,
    borderRadius: theme.border.radius.full,
  },
  loadingMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
  },
  loadingText: {
    marginLeft: theme.spacing.sm,
  },
  endMessage: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
}));
