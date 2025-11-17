import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '../api/comments/commentApi'
import type { Comment } from '../types/Comment'
import type { CommentUpdate } from '../types/dtos/CommentUpdate';

export function useComments(postId: string) {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data } = await commentApi.getByPostId(postId);
      return data
    },
    enabled: !!postId,
  })
}


export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentApi.create,
    onSuccess: (_data, variables: { post: string }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.post] });
    },
  });
}

export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CommentUpdate>({
    mutationFn: async (data: CommentUpdate) => {
      await commentApi.update(data);
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (oldComments) => {
        if (!oldComments) return [];
        return oldComments.map((c) =>
          c.id === variables.comment 
            ? { ...c, content: variables.content } 
            : c
        );
      });
    },
  });
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      await commentApi.delete(commentId);
      return commentId;
    },
    onSuccess: (commentId: string) => {
      queryClient.setQueryData(['comments', postId], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((comment: any) => comment.id !== commentId);
      });
    },
  });
}
