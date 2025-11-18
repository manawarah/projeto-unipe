"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = require("./AuthService");
const authMiddleware_1 = require("@src/app/middleware/authMiddleware");
const router = (0, express_1.Router)();
const authService = new AuthService_1.AuthService();
router.get('/me', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const user = await authService.me(req);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const token = await authService.login(req.body, res);
        return res.status(200).json(token);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
router.post('/logout', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        await authService.logout(res);
        return res.status(200).send();
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map