import { getContext } from "@src/context";
import { LikeResponseDTO } from "./dtos/LikeResponseDTO";
import { NewLikeDTO } from "./dtos/NewLikeDTO";
import { Like } from "./Like.model";
import { LikeForPostResponseDTO } from "./dtos/LikeForPostResponse";

export class LikeService {


    async getPostLikes(postId: string): Promise<LikeForPostResponseDTO> {
        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const totalLikes = await Like.countDocuments({ post: postId });
        const likedByUser = !!(await Like.exists({ post: postId, user: context.userId }));

        return new LikeForPostResponseDTO(postId, totalLikes, likedByUser);
    }

    async createLike(data: NewLikeDTO): Promise<LikeResponseDTO> {
        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const existingLike = await Like.findOne({
            user: context.userId,
            post: data.post,
        });

        if (existingLike) {
            throw new Error('Usuário já curtiu este post.');
        }

        const like = await Like.create({
            user: context.userId,
            post: data.post,
        });

        const populatedLike = await Like.findById(like._id)
            .populate('user', 'nome avatar email')
            .populate('post', 'content');

        if (!populatedLike) throw new Error('Erro ao criar like');

        return new LikeResponseDTO(populatedLike);
    }


    async deleteLike(postId: string): Promise<void> {

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const result = await Like.findOneAndDelete({
            post: postId,
            user: context.userId
        });

        if (!result) {
            throw new Error('Like não encontrado para este usuário neste post.');
        }
    }

}
