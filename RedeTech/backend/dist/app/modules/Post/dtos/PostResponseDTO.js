"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResponseDTO = void 0;
const UserResponseDTO_1 = require("../../User/dtos/UserResponseDTO");
class PostResponseDTO {
    constructor(post) {
        this._id = post._id;
        this.user = new UserResponseDTO_1.UserResponseDTO(post.user || {});
        this.content = post.content;
        this.timestamp = post.timestamp;
        this.likes = post.likes || 0;
        this.retweets = post.retweets || 0;
    }
}
exports.PostResponseDTO = PostResponseDTO;
//# sourceMappingURL=PostResponseDTO.js.map