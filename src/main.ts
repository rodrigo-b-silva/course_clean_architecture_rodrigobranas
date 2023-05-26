import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
// import FastifyAdapter from "./infra/http/FastifyAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const repositoryFactory = new DatabaseRepositoryFactory();
// const fastifyAdapter = new FastifyAdapter();
const expressAdapter = new ExpressAdapter();
new RouteConfig(expressAdapter, repositoryFactory);

expressAdapter.listen(3000);
