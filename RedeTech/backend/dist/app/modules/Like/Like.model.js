"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
}, {
    timestamps: true,
});
likeSchema.index({ user: 1, post: 1 }, { unique: true });
exports.Like = (0, mongoose_1.model)('Like', likeSchema);
//# sourceMappingURL=Like.model.js.map