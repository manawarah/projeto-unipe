import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '../api/likes/likesApi';

export function usePostLikes(postId: string) {
  return useQuery({
    queryKey: ['likes', postId],
    queryFn: () => likeApi.getPostLikes(postId),
    enabled: !!postId,
  });
}

export function useCreateLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { post: string }) => likeApi.createLike(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['likes', variables.post] });
    },
  });
}

export function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => likeApi.deleteLike(postId),
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['likes', postId] });
    },
  });
}
