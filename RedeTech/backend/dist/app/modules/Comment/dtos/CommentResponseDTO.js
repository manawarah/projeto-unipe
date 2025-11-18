"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResponseDTO = void 0;
const UserResponseDTO_1 = require("../../User/dtos/UserResponseDTO");
class CommentResponseDTO {
    constructor(comment) {
        this.id = comment._id.toString();
        this.content = comment.content;
        this.timestamp = comment.timestamp;
        this.likes = comment.likes;
        this.liked = comment.liked;
        if (comment.user && typeof comment.user === 'object') {
            this.user = new UserResponseDTO_1.UserResponseDTO(comment.user);
        }
        else {
            this.user = new UserResponseDTO_1.UserResponseDTO({ _id: comment.user });
        }
    }
}
exports.CommentResponseDTO = CommentResponseDTO;
//# sourceMappingURL=CommentResponseDTO.js.map