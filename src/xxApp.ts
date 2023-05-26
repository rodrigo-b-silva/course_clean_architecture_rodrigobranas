import express, { Express } from "express";
import { setupRoutes } from "./xxconfig/routes";

export const setupApp = (): Express => {
    const app = express();
    setupRoutes(app);
    return app;
}
