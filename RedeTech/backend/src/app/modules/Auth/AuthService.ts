import { Response, Request } from "express";
import { User } from "../User/User.model";
import { LoginDTO } from "./dtos/LoginDTO";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponseDTO } from "./dtos/LoginResponseDTO";
import { UserResponseDTO } from "../User/dtos/UserResponseDTO";
import { AuthRequest } from "./Router";

export class AuthService {
    async login(request: LoginDTO, res: Response) {
        const user = await User.findOne({ email: request.email });

        if (!user) throw new Error("Credenciais inválidas");

        const senhaValida = await bcrypt.compare(request.senha, user.senha);

        if (!senhaValida) throw new Error("Credenciais inválidas");

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "4h" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000,
        });

        return new LoginResponseDTO(
            token,
            new UserResponseDTO(user));
    }

    async me(req: AuthRequest): Promise<UserResponseDTO> {
        const user = await User.findById(req.userId);
        if (!user) throw new Error("Usuário não encontrado");
        return new UserResponseDTO(user);
    }

    async logout(res: Response): Promise<void> {
        res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
    }
}