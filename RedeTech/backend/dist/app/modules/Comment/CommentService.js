"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const context_1 = require("@src/context");
const Post_model_1 = require("../Post/Post.model");
const Comment_model_1 = require("./Comment.model");
const CommentResponseDTO_1 = require("./dtos/CommentResponseDTO");
const User_model_1 = require("../User/User.model");
class CommentService {
    async getByPost(id) {
        const comments = await Comment_model_1.Comment.find({ post: id })
            .populate('user', 'nome avatar')
            .populate('post', 'title')
            .sort({ timestamp: -1 });
        return comments.map(comment => new CommentResponseDTO_1.CommentResponseDTO(comment));
    }
    async createComment(data) {
        if (!data.post || !data.content)
            throw new Error("user, post e content são obrigatórios.");
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const userBD = await User_model_1.User.findById(context.userId);
        if (!userBD)
            throw new Error("Erro ao buscar usuário");
        const comment = await Comment_model_1.Comment.create({
            user: userBD,
            post: data.post,
            content: data.content,
        });
        await Post_model_1.Post.findByIdAndUpdate(data.post, { $push: { comments: comment._id } }, { new: true });
        const populated = await comment.populate('user', 'nome avatar');
        return new CommentResponseDTO_1.CommentResponseDTO(populated);
    }
    async updateComment(updateComment) {
        if (!updateComment.comment)
            throw new Error("ID do comentário é obrigatório");
        if (!updateComment.content)
            throw new Error("Conteúdo é obrigatório");
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const comment = await Comment_model_1.Comment.findById(updateComment.comment);
        if (!comment)
            throw new Error("Comentário não encontrado");
        if (comment.user.toString() !== context.userId.toString()) {
            throw new Error("Usuário não tem permissão para editar este comentário");
        }
        comment.content = updateComment.content;
        await comment.save();
        const populated = await comment.populate('user', 'nome avatar');
        return new CommentResponseDTO_1.CommentResponseDTO(populated);
    }
    async deleteComment(id) {
        if (!id)
            throw new Error("ID do comentário é obrigatório");
        const deletedComment = await Comment_model_1.Comment.findByIdAndDelete(id);
        if (!deletedComment)
            throw new Error("Comentário não encontrado");
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=CommentService.js.map