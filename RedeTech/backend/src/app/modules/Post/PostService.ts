import { getContext } from "@src/context";
import { NewPostDTO } from "./dtos/NewPostDTO";
import { PostResponseDTO } from "./dtos/PostResponseDTO";
import { Post } from "./Post.model";
import { UpdatePostDTO } from "./dtos/UpdatePostDTO";

export class PostService {

    async getAll(): Promise<PostResponseDTO[]> {
        const posts = await Post.find()
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
            .sort({ timestamp: -1 });

        return posts.map(post => new PostResponseDTO(post));
    }

    async getByUserId(idUser: string): Promise<PostResponseDTO[]> {
        const posts = await Post.find({ user: idUser })
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User',
                },
            })
            .sort({ timestamp: -1 });

        return posts.map(post => new PostResponseDTO(post));
    }

    async createPost(data: NewPostDTO): Promise<PostResponseDTO> {
        if (!data) throw new Error("O post não pode ser nulo");

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const postData = new NewPostDTO({
            ...data,
            user: context.userId
        });

        const post = await Post.create(postData);
        const populatedPost = await post.populate([{ path: 'user' }]);
        return new PostResponseDTO(populatedPost);
    }

    async updatePost(post: UpdatePostDTO): Promise<PostResponseDTO> {
        if (!post.post) throw new Error("ID do post é obrigatório");
        if (!post.content?.trim()) throw new Error("O conteúdo do post não pode estar vazio");

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        const postBD = await Post.findById(post.post);
        if (!postBD) throw new Error("Post não encontrado");

        const postUserId = (postBD.user as any)._id ? (postBD.user as any)._id.toString() : postBD.user.toString();
       if (postUserId.toString() !== context.userId.toString()) {
            throw new Error("Você não tem permissão para editar este post");
        }

        postBD.content = post.content;
        await postBD.save();
        const populatedPost = await postBD.populate([{ path: 'user' }]);

        return new PostResponseDTO(populatedPost);
    }

    async deletePost(id: string): Promise<void> {
        if (!id) throw new Error("ID do post é obrigatório");

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) throw new Error("Post não encontrado");
    }
}