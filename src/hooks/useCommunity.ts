import { useServices } from '@/services/ServicesProvider';
import type {
  Comment,
  CreateCommentRequest,
  CreatePostRequest,
  PaginatedResponse,
  Post,
} from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCommunity() {
  const { CommunityService } = useServices();
  const queryClient = useQueryClient();

  // Get posts with pagination
  const usePosts = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['posts', page, limit],
      queryFn: () => CommunityService.getPosts(page, limit),
      placeholderData: (previousData) => previousData,
    });
  };

  // Get single post
  const usePost = (postId: string) => {
    return useQuery({
      queryKey: ['post', postId],
      queryFn: () => CommunityService.getPost(postId),
      enabled: !!postId,
    });
  };

  // Get post comments
  const usePostComments = (postId: string, page: number = 1, limit: number = 20) => {
    return useQuery({
      queryKey: ['post', postId, 'comments', page, limit],
      queryFn: () => CommunityService.getComments(postId, page, limit),
      enabled: !!postId,
      placeholderData: (previousData) => previousData,
    });
  };

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (postData: CreatePostRequest) => CommunityService.createPost(postData),
    onSuccess: () => {
      // Invalidate posts queries to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ postId, postData }: { postId: string; postData: Partial<CreatePostRequest> }) =>
      CommunityService.updatePost(postId, postData),
    onSuccess: (updatedPost, { postId }) => {
      // Update the specific post in cache
      queryClient.setQueryData(['post', postId], updatedPost);
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => CommunityService.deletePost(postId),
    onSuccess: (_, postId) => {
      // Remove the post from cache
      queryClient.removeQueries({ queryKey: ['post', postId] });
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Toggle like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: (postId: string) => CommunityService.toggleLike(postId),
    onSuccess: (data, postId) => {
      // Update the post's like status in cache
      queryClient.setQueryData(['post', postId], (oldData: Post | undefined) => {
        if (oldData) {
          return {
            ...oldData,
            isLiked: data.isLiked,
            likesCount: data.likesCount,
          };
        }
        return oldData;
      });
      // Update posts list cache
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: PaginatedResponse<Post> | undefined) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map(post =>
              post.id === postId
                ? { ...post, isLiked: data.isLiked, likesCount: data.likesCount }
                : post
            ),
          };
        }
        return oldData;
      });
    },
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: (commentData: CreateCommentRequest) => CommunityService.createComment(commentData),
    onSuccess: (newComment, { postId }) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({ queryKey: ['post', postId, 'comments'] });
      // Update post's comment count
      queryClient.setQueryData(['post', postId], (oldData: Post | undefined) => {
        if (oldData) {
          return { ...oldData, commentsCount: oldData.commentsCount + 1 };
        }
        return oldData;
      });
    },
  });

  // Update comment mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      CommunityService.updateComment(commentId, content),
    onSuccess: (updatedComment, { commentId }) => {
      // Update comment in cache
      queryClient.setQueriesData({ queryKey: ['post'] }, (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: oldData.data.map((comment: Comment) =>
              comment.id === commentId ? updatedComment : comment
            ),
          };
        }
        return oldData;
      });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => CommunityService.deleteComment(commentId),
    onSuccess: (_, commentId) => {
      // Remove comment from cache
      queryClient.setQueriesData({ queryKey: ['post'] }, (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: oldData.data.filter((comment: Comment) => comment.id !== commentId),
          };
        }
        return oldData;
      });
    },
  });

  return {
    // Queries
    usePosts,
    usePost,
    usePostComments,

    // Post mutations
    createPost: createPostMutation.mutate,
    createPostAsync: createPostMutation.mutateAsync,
    isCreatingPost: createPostMutation.isPending,

    updatePost: updatePostMutation.mutate,
    updatePostAsync: updatePostMutation.mutateAsync,
    isUpdatingPost: updatePostMutation.isPending,

    deletePost: deletePostMutation.mutate,
    deletePostAsync: deletePostMutation.mutateAsync,
    isDeletingPost: deletePostMutation.isPending,

    toggleLike: toggleLikeMutation.mutate,
    toggleLikeAsync: toggleLikeMutation.mutateAsync,
    isTogglingLike: toggleLikeMutation.isPending,

    // Comment mutations
    createComment: createCommentMutation.mutate,
    createCommentAsync: createCommentMutation.mutateAsync,
    isCreatingComment: createCommentMutation.isPending,

    updateComment: updateCommentMutation.mutate,
    updateCommentAsync: updateCommentMutation.mutateAsync,
    isUpdatingComment: updateCommentMutation.isPending,

    deleteComment: deleteCommentMutation.mutate,
    deleteCommentAsync: deleteCommentMutation.mutateAsync,
    isDeletingComment: deleteCommentMutation.isPending,

    // Error states
    createPostError: createPostMutation.error,
    updatePostError: updatePostMutation.error,
    deletePostError: deletePostMutation.error,
    toggleLikeError: toggleLikeMutation.error,
    createCommentError: createCommentMutation.error,
    updateCommentError: updateCommentMutation.error,
    deleteCommentError: deleteCommentMutation.error,
  };
}
