import { getContext } from "@src/context";
import { Post } from "../Post/Post.model";
import { Comment } from "./Comment.model";
import { CommentResponseDTO } from "./dtos/CommentResponseDTO";
import { NewCommentDTO } from "./dtos/NewCommentDTO";
import { User } from "../User/User.model";
import { UpdateCommentDTO } from "./dtos/UpdateCommentDTO";

export class CommentService {

    async getByPost(id: string): Promise<CommentResponseDTO[]> {
        const comments = await Comment.find({ post: id })
            .populate('user', 'nome avatar')
            .populate('post', 'title')
            .sort({ timestamp: -1 });
        return comments.map(comment => new CommentResponseDTO(comment));
    }

    async createComment(data: NewCommentDTO): Promise<CommentResponseDTO> {
        if (!data.post || !data.content)
            throw new Error("user, post e content são obrigatórios.");

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const userBD = await User.findById(context.userId);
        if (!userBD) throw new Error("Erro ao buscar usuário");

        const comment = await Comment.create({
            user: userBD,
            post: data.post,
            content: data.content,
        });

        // adiciona o comentário no post
        await Post.findByIdAndUpdate(
            data.post,
            { $push: { comments: comment._id } },
            { new: true }
        );

        const populated = await comment.populate('user', 'nome avatar');
        return new CommentResponseDTO(populated);

    }

    async updateComment(updateComment: UpdateCommentDTO): Promise<CommentResponseDTO> {
        if (!updateComment.comment) throw new Error("ID do comentário é obrigatório");
        if (!updateComment.content) throw new Error("Conteúdo é obrigatório");

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const comment = await Comment.findById(updateComment.comment);
        if (!comment) throw new Error("Comentário não encontrado");

        if (comment.user.toString() !== context.userId.toString()) {
            throw new Error("Usuário não tem permissão para editar este comentário");
        }

        comment.content = updateComment.content;
        await comment.save();

        const populated = await comment.populate('user', 'nome avatar');

        return new CommentResponseDTO(populated);
    }


    async deleteComment(id: string): Promise<void> {
        if (!id) throw new Error("ID do comentário é obrigatório");

        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) throw new Error("Comentário não encontrado");
    }

}