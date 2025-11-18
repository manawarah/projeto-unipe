"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = exports.asyncLocalStorage = void 0;
const node_async_hooks_1 = require("node:async_hooks");
exports.asyncLocalStorage = new node_async_hooks_1.AsyncLocalStorage();
const getContext = () => exports.asyncLocalStorage.getStore();
exports.getContext = getContext;
//# sourceMappingURL=context.js.map