"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseRepositoryFactory_1 = __importDefault(require("./infra/factory/DatabaseRepositoryFactory"));
const FastifyAdapter_1 = __importDefault(require("./infra/http/FastifyAdapter"));
const RouteConfig_1 = __importDefault(require("./infra/http/RouteConfig"));
const repositoryFactory = new DatabaseRepositoryFactory_1.default();
const fastifyAdapter = new FastifyAdapter_1.default();
// const expressAdapter = new ExpressAdapter();
new RouteConfig_1.default(fastifyAdapter, repositoryFactory);
fastifyAdapter.listen(3000);
