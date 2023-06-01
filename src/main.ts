import OrderPlacedStockHandler from "./application/handler/OrderPlacedStockHandler";
import Broker from "./infra/broker/Broker";
import OrderDAOatabase from "./infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
// import FastifyAdapter from "./infra/http/FastifyAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const connection = PgPromiseConnectionAdapter.getInstance();
const orderDAO = new OrderDAOatabase(connection);
const repositoryFactory = new DatabaseRepositoryFactory();
// const fastifyAdapter = new FastifyAdapter();
const expressAdapter = new ExpressAdapter();
const broker = new Broker();
broker.register(new OrderPlacedStockHandler(repositoryFactory));
new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker);

expressAdapter.listen(3000);
