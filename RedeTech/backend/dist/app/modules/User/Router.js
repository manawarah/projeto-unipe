"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("./UserService");
const authMiddleware_1 = require("@src/app/middleware/authMiddleware");
const router = (0, express_1.Router)();
const userService = new UserService_1.UserService();
router.get('/', async (req, res) => {
    try {
        const prefixRaw = req.query.prefix;
        if (prefixRaw && typeof prefixRaw !== "string") {
            return res.status(400).json({ message: "Parâmetro 'prefix' inválido" });
        }
        let users;
        if (prefixRaw) {
            users = await userService.getByNamePrefix(prefixRaw);
        }
        else {
            users = await userService.getAll();
        }
        return res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
});
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const users = await userService.getByIdUser(id);
        return response.status(200).send(users);
    }
    catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});
router.post('/', async (request, response) => {
    try {
        const user = await userService.createUser(request.body);
        return response.status(201).send(user);
    }
    catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userService.updateUser(id, request.body);
        return response.status(201).send(user);
    }
    catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
router.delete('/:id', authMiddleware_1.verifyToken, async (request, response) => {
    try {
        const { id } = request.params;
        await userService.deleteUser(id);
        return response.status(200).send();
    }
    catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map