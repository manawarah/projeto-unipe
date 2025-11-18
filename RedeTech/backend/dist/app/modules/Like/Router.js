"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LikeService_1 = require("./LikeService");
const authMiddleware_1 = require("@src/app/middleware/authMiddleware");
const router = (0, express_1.Router)();
const likeService = new LikeService_1.LikeService();
router.get('/:idPost', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { idPost } = request.params;
        const users = await likeService.getPostLikes(idPost);
        return response.status(200).send(users);
    }
    catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});
router.post('/', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const user = await likeService.createLike(request.body);
        return response.status(201).send(user);
    }
    catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
router.delete('/:idPost', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { idPost } = request.params;
        await likeService.deleteLike(idPost);
        return response.status(200).send();
    }
    catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map