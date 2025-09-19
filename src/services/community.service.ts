import { API_CONFIG, ENV_CONFIG } from '@/constants';
import type {
  Comment,
  CreateCommentRequest,
  CreatePostRequest,
  PaginatedResponse,
  Post,
} from '@/types';
import { api } from './api';
import { communityMockService } from './mockService';

export class CommunityService {
  // Get posts with pagination
  async getPosts(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.getPosts(page, limit);
    }
    
    return api.get<PaginatedResponse<Post>>(
      `${API_CONFIG.ENDPOINTS.COMMUNITY.POSTS}?page=${page}&limit=${limit}`
    );
  }

  // Get single post
  async getPost(postId: string): Promise<Post> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.getPost(postId);
    }
    
    return api.get<Post>(`${API_CONFIG.ENDPOINTS.COMMUNITY.POSTS}/${postId}`);
  }

  // Create new post
  async createPost(postData: CreatePostRequest): Promise<Post> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.createPost(postData);
    }
    
    return api.post<Post>(API_CONFIG.ENDPOINTS.COMMUNITY.POSTS, postData);
  }

  // Update post
  async updatePost(postId: string, postData: Partial<CreatePostRequest>): Promise<Post> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.createPost({ ...postData, id: postId } as any);
    }
    
    return api.put<Post>(`${API_CONFIG.ENDPOINTS.COMMUNITY.POSTS}/${postId}`, postData);
  }

  // Delete post
  async deletePost(postId: string): Promise<void> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve();
    }
    
    return api.delete<void>(`${API_CONFIG.ENDPOINTS.COMMUNITY.POSTS}/${postId}`);
  }

  // Like/Unlike post
  async toggleLike(postId: string): Promise<{ isLiked: boolean; likesCount: number }> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve({ isLiked: true, likesCount: 15 });
    }
    
    return api.post<{ isLiked: boolean; likesCount: number }>(
      `${API_CONFIG.ENDPOINTS.COMMUNITY.LIKES}/${postId}`
    );
  }

  // Get post comments
  async getComments(postId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Comment>> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.getComments(postId, page, limit);
    }
    
    return api.get<PaginatedResponse<Comment>>(
      `${API_CONFIG.ENDPOINTS.COMMUNITY.COMMENTS}?postId=${postId}&page=${page}&limit=${limit}`
    );
  }

  // Create comment
  async createComment(commentData: CreateCommentRequest): Promise<Comment> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.createComment(commentData);
    }
    
    return api.post<Comment>(API_CONFIG.ENDPOINTS.COMMUNITY.COMMENTS, commentData);
  }

  // Update comment
  async updateComment(commentId: string, content: string): Promise<Comment> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return communityMockService.createComment({ postId: '1', content } as any);
    }
    
    return api.put<Comment>(`${API_CONFIG.ENDPOINTS.COMMUNITY.COMMENTS}/${commentId}`, {
      content,
    });
  }

  // Delete comment
  async deleteComment(commentId: string): Promise<void> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve();
    }
    
    return api.delete<void>(`${API_CONFIG.ENDPOINTS.COMMUNITY.COMMENTS}/${commentId}`);
  }
}