"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentService_1 = require("./CommentService");
const authMiddleware_1 = require("@src/app/middleware/authMiddleware");
const router = (0, express_1.Router)();
const commentService = new CommentService_1.CommentService();
router.get('/post/:post', async (request, response) => {
    try {
        const { post } = request.params;
        const comments = await commentService.getByPost(post);
        return response.status(200).send(comments);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
router.post('/', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const comments = await commentService.createComment(request.body);
        return response.status(201).send(comments);
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
router.put('/:id', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { id } = request.params;
        const comments = await commentService.updateComment(request.body);
        return response.status(201).send(comments);
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
router.delete('/:id', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { id } = request.params;
        const comments = await commentService.deleteComment(id);
        return response.status(200).send(comments);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map