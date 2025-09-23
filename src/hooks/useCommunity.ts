import { CommunityService } from '@/services/community.service';
import type { PostCreate, PostResponse } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface UseCommunityReturn {
  posts: PostResponse[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  hasMore: boolean;
  loadPosts: (refresh?: boolean) => Promise<void>;
  createPost: (content: string, imageUploadIds?: string[], location?: Record<string, number>, isHeatReport?: boolean, temperature?: number, heatSeverity?: string) => Promise<boolean>;
  addReaction: (postId: string, reactionType: string) => Promise<void>;
  removeReaction: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

export const useCommunity = (): UseCommunityReturn => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const communityService = new CommunityService();
  const LIMIT = 20;

  const loadPosts = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
        setSkip(0);
        setHasMore(true);
      } else {
        setLoading(true);
      }
      
      setError(null);
      
        const currentSkip = refresh ? 0 : skip;
      
      // Use real API
      const newPosts = await communityService.getPosts(currentSkip, LIMIT);
      
      if (refresh) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      
      setSkip(currentSkip + LIMIT);
      setHasMore(newPosts.length === LIMIT);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải bài viết';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [skip]);

  const createPost = useCallback(async (
    content: string, 
    imageUploadIds?: string[], 
    location?: Record<string, number>, 
    isHeatReport?: boolean, 
    temperature?: number, 
    heatSeverity?: string
  ): Promise<boolean> => {
    try {
      setError(null);
      
      const postData: PostCreate = {
        content,
        image_upload_ids: imageUploadIds,
        location,
        is_heat_report: isHeatReport,
        temperature,
        heat_severity: heatSeverity,
      };
      
      // Use real API
      const newPost = await communityService.createPost(postData);
      
      // Add the new post to the beginning of the list
      setPosts(prev => [newPost, ...prev]);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo bài viết';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
      return false;
    }
  }, []);

  const addReaction = useCallback(async (postId: string, reactionType: string) => {
    try {
      setError(null);
      
      // Use real API
      const updatedPost = await communityService.addReaction(postId, reactionType as 'like' | 'heart');
      
      // Update the post in the list
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi thêm phản ứng';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
    }
  }, []);

  const removeReaction = useCallback(async (postId: string) => {
    try {
      setError(null);
      
      // Use real API
      const updatedPost = await communityService.removeReaction(postId);
      
      // Update the post in the list
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa phản ứng';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
    }
  }, []);

  const addComment = useCallback(async (postId: string, content: string) => {
    try {
      setError(null);
      
      // Use real API
      const updatedPost = await communityService.addComment(postId, { content });
      
      // Update the post in the list
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi thêm bình luận';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
    }
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      setError(null);
      
      // Use real API
      await communityService.deletePost(postId);
      
      // Remove the post from the list
      setPosts(prev => prev.filter(post => post.id !== postId));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa bài viết';
      setError(errorMessage);
      Alert.alert('Lỗi', errorMessage);
    }
  }, []);

  const refreshPosts = useCallback(async () => {
    await loadPosts(true);
  }, [loadPosts]);

  // Load initial posts
  useEffect(() => {
    loadPosts(true);
  }, []);

  return {
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
    deletePost,
    refreshPosts,
  };
};