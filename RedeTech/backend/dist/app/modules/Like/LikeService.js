"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const context_1 = require("@src/context");
const LikeResponseDTO_1 = require("./dtos/LikeResponseDTO");
const Like_model_1 = require("./Like.model");
const LikeForPostResponse_1 = require("./dtos/LikeForPostResponse");
class LikeService {
    async getPostLikes(postId) {
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const totalLikes = await Like_model_1.Like.countDocuments({ post: postId });
        const likedByUser = !!(await Like_model_1.Like.exists({ post: postId, user: context.userId }));
        return new LikeForPostResponse_1.LikeForPostResponseDTO(postId, totalLikes, likedByUser);
    }
    async createLike(data) {
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const existingLike = await Like_model_1.Like.findOne({
            user: context.userId,
            post: data.post,
        });
        if (existingLike) {
            throw new Error('Usuário já curtiu este post.');
        }
        const like = await Like_model_1.Like.create({
            user: context.userId,
            post: data.post,
        });
        const populatedLike = await Like_model_1.Like.findById(like._id)
            .populate('user', 'nome avatar email')
            .populate('post', 'content');
        if (!populatedLike)
            throw new Error('Erro ao criar like');
        return new LikeResponseDTO_1.LikeResponseDTO(populatedLike);
    }
    async deleteLike(postId) {
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const result = await Like_model_1.Like.findOneAndDelete({
            post: postId,
            user: context.userId
        });
        if (!result) {
            throw new Error('Like não encontrado para este usuário neste post.');
        }
    }
}
exports.LikeService = LikeService;
//# sourceMappingURL=LikeService.js.map