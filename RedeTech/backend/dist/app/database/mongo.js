"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const MONGO_URI = process.env.MONGO_URI || '';
async function connectMongo() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB conectado');
    }
    catch (err) {
        console.error('Erro de conexão com MongoDB:', err);
        process.exit(1);
    }
}
//# sourceMappingURL=mongo.js.map