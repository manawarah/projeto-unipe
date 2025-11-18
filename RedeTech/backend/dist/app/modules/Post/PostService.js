"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const context_1 = require("@src/context");
const NewPostDTO_1 = require("./dtos/NewPostDTO");
const PostResponseDTO_1 = require("./dtos/PostResponseDTO");
const Post_model_1 = require("./Post.model");
class PostService {
    async getAll() {
        const posts = await Post_model_1.Post.find()
            .populate('user')
            .populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
            .sort({ timestamp: -1 });
        return posts.map(post => new PostResponseDTO_1.PostResponseDTO(post));
    }
    async getByUserId(idUser) {
        const posts = await Post_model_1.Post.find({ user: idUser })
            .populate('user')
            .populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User',
            },
        })
            .sort({ timestamp: -1 });
        return posts.map(post => new PostResponseDTO_1.PostResponseDTO(post));
    }
    async createPost(data) {
        if (!data)
            throw new Error("O post não pode ser nulo");
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const postData = new NewPostDTO_1.NewPostDTO({
            ...data,
            user: context.userId
        });
        const post = await Post_model_1.Post.create(postData);
        const populatedPost = await post.populate([{ path: 'user' }]);
        return new PostResponseDTO_1.PostResponseDTO(populatedPost);
    }
    async updatePost(post) {
        var _a;
        if (!post.post)
            throw new Error("ID do post é obrigatório");
        if (!((_a = post.content) === null || _a === void 0 ? void 0 : _a.trim()))
            throw new Error("O conteúdo do post não pode estar vazio");
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        const postBD = await Post_model_1.Post.findById(post.post);
        if (!postBD)
            throw new Error("Post não encontrado");
        const postUserId = postBD.user._id ? postBD.user._id.toString() : postBD.user.toString();
        if (postUserId.toString() !== context.userId.toString()) {
            throw new Error("Você não tem permissão para editar este post");
        }
        postBD.content = post.content;
        await postBD.save();
        const populatedPost = await postBD.populate([{ path: 'user' }]);
        return new PostResponseDTO_1.PostResponseDTO(populatedPost);
    }
    async deletePost(id) {
        if (!id)
            throw new Error("ID do post é obrigatório");
        const deletedPost = await Post_model_1.Post.findByIdAndDelete(id);
        if (!deletedPost)
            throw new Error("Post não encontrado");
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map