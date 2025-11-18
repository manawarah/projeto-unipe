"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_model_1 = require("../User/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginResponseDTO_1 = require("./dtos/LoginResponseDTO");
const UserResponseDTO_1 = require("../User/dtos/UserResponseDTO");
class AuthService {
    async login(request, res) {
        const user = await User_model_1.User.findOne({ email: request.email });
        if (!user)
            throw new Error("Credenciais inválidas");
        const senhaValida = await bcryptjs_1.default.compare(request.senha, user.senha);
        if (!senhaValida)
            throw new Error("Credenciais inválidas");
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "4h" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000,
        });
        return new LoginResponseDTO_1.LoginResponseDTO(token, new UserResponseDTO_1.UserResponseDTO(user));
    }
    async me(req) {
        const user = await User_model_1.User.findById(req.userId);
        if (!user)
            throw new Error("Usuário não encontrado");
        return new UserResponseDTO_1.UserResponseDTO(user);
    }
    async logout(res) {
        res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map