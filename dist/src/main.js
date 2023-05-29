"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderDAODatabase_1 = __importDefault(require("./infra/dao/OrderDAODatabase"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("./infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("./infra/factory/DatabaseRepositoryFactory"));
const ExpressAdapter_1 = __importDefault(require("./infra/http/ExpressAdapter"));
// import FastifyAdapter from "./infra/http/FastifyAdapter";
const RouteConfig_1 = __importDefault(require("./infra/http/RouteConfig"));
const connection = PgPromiseConnectionAdapter_1.default.getInstance();
const orderDAO = new OrderDAODatabase_1.default(connection);
const repositoryFactory = new DatabaseRepositoryFactory_1.default();
// const fastifyAdapter = new FastifyAdapter();
const expressAdapter = new ExpressAdapter_1.default();
new RouteConfig_1.default(expressAdapter, repositoryFactory, orderDAO);
expressAdapter.listen(3000);
