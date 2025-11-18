"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const context_1 = require("@src/context");
const Comment_model_1 = require("../Comment/Comment.model");
const Like_model_1 = require("../Like/Like.model");
const Post_model_1 = require("../Post/Post.model");
const UserResponseDTO_1 = require("./dtos/UserResponseDTO");
const User_model_1 = require("./User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    async getAll() {
        const users = await User_model_1.User.find();
        return users.map(user => new UserResponseDTO_1.UserResponseDTO(user));
    }
    async getByIdUser(id) {
        const user = await User_model_1.User.findById(id);
        if (!user)
            throw new Error("Usuário não encontrado");
        return new UserResponseDTO_1.UserResponseDTO(user);
    }
    async getByNamePrefix(prefix) {
        const regex = new RegExp(`^${prefix}`, "i");
        const users = await User_model_1.User.find({ nome: { $regex: regex } });
        return users.map(user => new UserResponseDTO_1.UserResponseDTO(user));
    }
    async createUser(data) {
        if (data == null)
            throw new Error("O usuário não pode ser nulo");
        const hashedPassword = await bcryptjs_1.default.hash(data.senha, 10);
        const user = await User_model_1.User.create({
            ...data,
            senha: hashedPassword,
        });
        return new UserResponseDTO_1.UserResponseDTO(user);
    }
    async updateUser(id, data) {
        if (!id)
            throw new Error("ID do usuário é obrigatório");
        const user = await User_model_1.User.findById(id);
        if (!user)
            throw new Error("Usuário não encontrado");
        if (data.nome)
            user.nome = data.nome;
        if (data.senha && data.senha.length >= 6) {
            const hashedPassword = await bcryptjs_1.default.hash(data.senha, 10);
            user.senha = hashedPassword;
        }
        const updatedUser = await user.save();
        return new UserResponseDTO_1.UserResponseDTO(updatedUser);
    }
    async deleteUser(id) {
        if (!id)
            throw new Error("ID do usuário é obrigatório");
        const context = (0, context_1.getContext)();
        if (!(context === null || context === void 0 ? void 0 : context.userId))
            throw new Error("Usuário não autenticado");
        if (context.userId != id) {
            throw new Error("Você não tem permissão para deletar este usuário");
        }
        await Post_model_1.Post.deleteMany({ user: id });
        await Like_model_1.Like.deleteMany({ user: id });
        await Comment_model_1.Comment.deleteMany({ user: id });
        const deletedUser = await User_model_1.User.findByIdAndDelete(id);
        if (!deletedUser)
            throw new Error("Usuário não encontrado");
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map