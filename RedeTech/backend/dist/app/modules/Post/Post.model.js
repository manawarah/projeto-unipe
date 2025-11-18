"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }]
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
//# sourceMappingURL=Post.model.js.map