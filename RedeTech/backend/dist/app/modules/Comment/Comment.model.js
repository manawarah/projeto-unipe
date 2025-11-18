"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose_1.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
//# sourceMappingURL=Comment.model.js.map