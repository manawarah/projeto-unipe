import { getContext } from "@src/context";
import { Comment } from "../Comment/Comment.model";
import { Like } from "../Like/Like.model";
import { Post } from "../Post/Post.model";
import { NewUserDTO } from "./dtos/NewUserDTO";
import { UserResponseDTO } from "./dtos/UserResponseDTO";
import { User } from "./User.model";
import bcrypt from "bcryptjs";

export class UserService {

    async getAll(): Promise<UserResponseDTO[]> {
        const users = await User.find();
        return users.map(user => new UserResponseDTO(user));
    }

    async getByIdUser(id: string): Promise<UserResponseDTO> {
        const user = await User.findById(id);
        if (!user) throw new Error("Usuário não encontrado");

        return new UserResponseDTO(user);
    }


    async getByNamePrefix(prefix: string): Promise<UserResponseDTO[]> {
        const regex = new RegExp(`^${prefix}`, "i");
        const users = await User.find({ nome: { $regex: regex } });
        return users.map(user => new UserResponseDTO(user));
    }


    async createUser(data: NewUserDTO): Promise<UserResponseDTO> {
        if (data == null) throw new Error("O usuário não pode ser nulo");

        const hashedPassword = await bcrypt.hash(data.senha, 10);

        const user = await User.create({
            ...data,
            senha: hashedPassword,
        });

        return new UserResponseDTO(user);
    }

    async updateUser(id: string, data: Partial<NewUserDTO>): Promise<UserResponseDTO> {
        if (!id) throw new Error("ID do usuário é obrigatório");

        const user = await User.findById(id);
        if (!user) throw new Error("Usuário não encontrado");

        if (data.nome) user.nome = data.nome;

        if (data.senha && data.senha.length >= 6) {
            const hashedPassword = await bcrypt.hash(data.senha, 10);
            user.senha = hashedPassword;
        }

        const updatedUser = await user.save();
        return new UserResponseDTO(updatedUser);
    }


    async deleteUser(id: string): Promise<void> {
        if (!id) throw new Error("ID do usuário é obrigatório");

        const context = getContext();
        if (!context?.userId) throw new Error("Usuário não autenticado");

        if (context.userId != id) {
            throw new Error("Você não tem permissão para deletar este usuário");
        }

        await Post.deleteMany({ user: id });
        await Like.deleteMany({ user: id });
        await Comment.deleteMany({ user: id });
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error("Usuário não encontrado");
    }

}   