import { Router } from 'express';
import { CommentService } from './CommentService';
import { verifyToken } from '@src/app/middleware/authMiddleware';

const router = Router();
const commentService = new CommentService();

router.get('/post/:post', async(request, response) => {
    try {
        const { post } = request.params;
        const comments = await commentService.getByPost(post);
        return response.status(200).send(comments);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

router.post('/', verifyToken, async(request, response) => {
    try {
        const comments = await commentService.createComment(request.body);
        return response.status(201).send(comments);
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, async(request, response) => {
    try {
        const { id } = request.params;
        const comments = await commentService.updateComment(request.body);
        return response.status(201).send(comments);
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, async(request, response) => {
    try {
        const { id } = request.params;
        const comments = await commentService.deleteComment(id);
        return response.status(200).send(comments);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

export default router;