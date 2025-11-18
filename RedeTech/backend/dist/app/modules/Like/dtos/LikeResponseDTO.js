"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeResponseDTO = void 0;
class LikeResponseDTO {
    constructor(user) {
        this._id = user._id.toString();
        this.post = user.post;
        this.user = user.user;
        this.updatedAt = user.updatedAt;
        this.createdAt = user.createdAt;
    }
}
exports.LikeResponseDTO = LikeResponseDTO;
//# sourceMappingURL=LikeResponseDTO.js.map