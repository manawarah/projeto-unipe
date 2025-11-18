import { Router } from 'express';
import { UserService } from './UserService';
import { verifyToken } from '@src/app/middleware/authMiddleware';

const router = Router();
const userService = new UserService();

import { Request, Response } from "express";

router.get('/', async (req: Request, res: Response) => {
  try {
    const prefixRaw = req.query.prefix;

    if (prefixRaw && typeof prefixRaw !== "string") {
      return res.status(400).json({ message: "Parâmetro 'prefix' inválido" });
    }

    let users;
    if (prefixRaw) {
      users = await userService.getByNamePrefix(prefixRaw);
    } else {
      users = await userService.getAll();
    }

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});


router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const users = await userService.getByIdUser(id);
        return response.status(200).send(users);
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});


router.post('/', async (request, response) => {
    try {
        const user = await userService.createUser(request.body);
        return response.status(201).send(user);
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userService.updateUser(id, request.body);
        return response.status(201).send(user);
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

router.delete('/:id', verifyToken, async (request, response) => {
    try {
        const { id } = request.params;
        await userService.deleteUser(id);
        return response.status(200).send();
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

export default router;