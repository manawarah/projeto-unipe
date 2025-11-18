"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDTO = void 0;
class UserResponseDTO {
    constructor(user) {
        this._id = user._id;
        this.nome = user.nome;
        this.email = user.email;
        this.avatar = user.avatar;
        this.updatedAt = user.updatedAt;
        this.createdAt = user.createdAt;
    }
}
exports.UserResponseDTO = UserResponseDTO;
//# sourceMappingURL=UserResponseDTO.js.map