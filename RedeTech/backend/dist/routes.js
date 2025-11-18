"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Router_1 = __importDefault(require("@src/app/modules/Post/Router"));
const Router_2 = __importDefault(require("@src/app/modules/User/Router"));
const Router_3 = __importDefault(require("@src/app/modules/Comment/Router"));
const Router_4 = __importDefault(require("@src/app/modules/Auth/Router"));
const Router_5 = __importDefault(require("@src/app/modules/Like/Router"));
const router = (0, express_1.Router)();
router.use('/api/likes', Router_5.default);
router.use('/api/posts', Router_1.default);
router.use('/api/users', Router_2.default);
router.use('/api/comments', Router_3.default);
router.use('/api/auth', Router_4.default);
exports.default = router;
//# sourceMappingURL=routes.js.map