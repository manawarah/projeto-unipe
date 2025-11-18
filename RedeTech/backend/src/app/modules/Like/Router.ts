import { Router } from 'express';
import { LikeService } from './LikeService';
import { verifyToken } from '@src/app/middleware/authMiddleware';

const router = Router();
const likeService = new LikeService();

router.get('/:idPost', verifyToken, async (request, response) => {
    try {
        const { idPost } = request.params;
        const users = await likeService.getPostLikes(idPost);
        return response.status(200).send(users);
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

router.post('/', verifyToken, async (request, response) => {
    try {
        const user = await likeService.createLike(request.body);
        return response.status(201).send(user);
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

router.delete('/:idPost', verifyToken, async (request, response) => {
    try {
        const { idPost } = request.params;
        await likeService.deleteLike(idPost);
        return response.status(200).send();
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

export default router;