"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.model.js.map