"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv/config");
const mongo_1 = require("./app/database/mongo");
class Server {
    static start() {
        const port = parseInt(process.env.PORT) || 3333;
        const application = new app_1.SetupApplication(port);
        application.init();
        application.start();
    }
}
(0, mongo_1.connectMongo)();
Server.start();
//# sourceMappingURL=server.js.map