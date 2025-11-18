"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const context_1 = require("@src/context");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    if (!token) {
        res.status(403).json({ message: "Token não fornecido" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        req.userId = userId;
        context_1.asyncLocalStorage.run({ userId }, () => {
            next();
        });
    }
    catch {
        res.status(401).json({ message: "Token inválido ou expirado" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authMiddleware.js.map