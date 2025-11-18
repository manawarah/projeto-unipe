"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupApplication = void 0;
require("./util/module-alias");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class SetupApplication {
    constructor(port = 3000, app = (0, express_1.default)()) {
        this.port = port;
        this.app = app;
    }
    init() {
        this.setupExpress();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.use(routes_1.default);
    }
    setupExpress() {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: [frontendUrl],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        }));
    }
    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.SetupApplication = SetupApplication;
//# sourceMappingURL=app.js.map