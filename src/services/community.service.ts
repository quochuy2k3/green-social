import {
  CommentRequest,
  PostCreate,
  PostResponse,
  PostUpdate,
  ReactionRequest,
  UserProfile
} from '@/types/api';
import apiClient from './api';

export class CommunityService {
  /**
   * Get posts with pagination
   */
  async getPosts(skip: number = 0, limit: number = 20): Promise<PostResponse[]> {
    const response = await apiClient.get<PostResponse[]>('/posts/', {
      params: { skip, limit }
    });
    return response.data;
  }

  /**
   * Get single post
   */
  async getPost(postId: string): Promise<PostResponse> {
    const response = await apiClient.get<PostResponse>(`/posts/${postId}`);
    return response.data;
  }

  /**
   * Create new post
   */
  async createPost(postData: PostCreate): Promise<PostResponse> {
    const response = await apiClient.post<PostResponse>('/posts/', postData);
    return response.data;
  }

  /**
   * Update post
   */
  async updatePost(postId: string, postData: PostUpdate): Promise<PostResponse> {
    const response = await apiClient.put<PostResponse>(`/posts/${postId}`, postData);
    return response.data;
  }

  /**
   * Delete post
   */
  async deletePost(postId: string): Promise<void> {
    await apiClient.delete(`/posts/${postId}`);
  }

  /**
   * Get user posts
   */
  async getUserPosts(userId: string, skip: number = 0, limit: number = 20): Promise<PostResponse[]> {
    const response = await apiClient.get<PostResponse[]>(`/posts/user/${userId}`, {
      params: { skip, limit }
    });
    return response.data;
  }

  /**
   * Get user profile
   */
  async getUser(userId: string): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(`/users/${userId}`);
    return response.data;
  }

  /**
   * Add reaction to post
   */
  async addReaction(postId: string, reactionType: 'heart' | 'like'): Promise<PostResponse> {
    const reactionData: ReactionRequest = { reaction_type: reactionType };
    const response = await apiClient.post<PostResponse>(`/posts/${postId}/reactions`, reactionData);
    return response.data;
  }

  /**
   * Remove reaction from post
   */
  async removeReaction(postId: string): Promise<PostResponse> {
    const response = await apiClient.delete<PostResponse>(`/posts/${postId}/reactions`);
    return response.data;
  }

  /**
   * Add comment to post
   */
  async addComment(postId: string, commentData: CommentRequest): Promise<PostResponse> {
    const response = await apiClient.post<PostResponse>(`/posts/${postId}/comments`, commentData);
    return response.data;
  }

  /**
   * Delete comment
   */
  async deleteComment(postId: string, commentId: string): Promise<void> {
    await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
  }
}

export const communityService = new CommunityService();