import { Router } from 'express';
import { PostService } from './PostService';
import { verifyToken } from '@src/app/middleware/authMiddleware';

const router = Router();
const postService = new PostService();

router.get('/', async(request, response) => {
    try {
        const posts = await postService.getAll();
        return response.status(200).send(posts);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

router.get('/', async(request, response) => {
    try {
        const posts = await postService.getAll();
        return response.status(200).send(posts);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

router.get('/user/:idUser', async(request, response) => {
    try {
        const { idUser } = request.params;
        const posts = await postService.getByUserId(idUser);
        return response.status(200).send(posts);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

router.post('/', verifyToken, async(request, response) => {
    try {
        const post = await postService.createPost(request.body);
        return response.status(201).send(post);
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, async(request, response) => {
    try {
        const post = await postService.updatePost(request.body);
        return response.status(201).send(post);
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, async(request, response) => {
    try {
        const { id } = request.params;
        await postService.deletePost(id);
        return response.status(200).send();
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

export default router;