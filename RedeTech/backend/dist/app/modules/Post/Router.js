"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostService_1 = require("./PostService");
const authMiddleware_1 = require("@src/app/middleware/authMiddleware");
const router = (0, express_1.Router)();
const postService = new PostService_1.PostService();
router.get('/', async (request, response) => {
    try {
        const posts = await postService.getAll();
        return response.status(200).send(posts);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
router.get('/', async (request, response) => {
    try {
        const posts = await postService.getAll();
        return response.status(200).send(posts);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
router.get('/user/:idUser', async (request, response) => {
    try {
        const { idUser } = request.params;
        const posts = await postService.getByUserId(idUser);
        return response.status(200).send(posts);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
router.post('/', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const post = await postService.createPost(request.body);
        return response.status(201).send(post);
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
router.put('/:id', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const post = await postService.updatePost(request.body);
        return response.status(201).send(post);
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
router.delete('/:id', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { id } = request.params;
        await postService.deletePost(id);
        return response.status(200).send();
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map