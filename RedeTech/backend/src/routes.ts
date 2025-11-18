import { Router } from 'express';
import PostsRouter from '@src/app/modules/Post/Router';
import UsersRouter from '@src/app/modules/User/Router';
import CommentRouter from '@src/app/modules/Comment/Router';
import AuthRouter from '@src/app/modules/Auth/Router';
import LikesRouter from '@src/app/modules/Like/Router';

const router = Router();

router.use('/api/likes', LikesRouter);
router.use('/api/posts', PostsRouter);
router.use('/api/users', UsersRouter);
router.use('/api/comments', CommentRouter);
router.use('/api/auth', AuthRouter);

export default router;
