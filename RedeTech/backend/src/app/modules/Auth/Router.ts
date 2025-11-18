import { Router, Request, Response } from "express";
import { AuthService } from "./AuthService";
import { verifyToken } from "@src/app/middleware/authMiddleware";

export interface AuthRequest extends Request {
  userId?: string;
}

const router = Router();
const authService = new AuthService();

router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.me(req);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body, res);
        return res.status(200).json(token);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/logout', verifyToken, async (req: Request, res: Response) => {
    try {
        await authService.logout(res);
        return res.status(200).send();
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;