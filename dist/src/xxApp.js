"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./xxconfig/routes");
const setupApp = () => {
    const app = (0, express_1.default)();
    (0, routes_1.setupRoutes)(app);
    return app;
};
exports.setupApp = setupApp;
