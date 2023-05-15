import { Express, Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

export const setupRoutes = (app: Express): void => {
    const router = Router();
    app.use("/api", router)
    readdirSync(join(__dirname, "../infra/routes")).map(async file => {
        (await import(`../infra/routes/${file}`)).default(router)
    })
}