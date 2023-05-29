import SimulateFreigth from "../../application/useCase/simulate_freight/SimulateFreigth";
import DefaultFreigthCalculator from "../../domain/entity/DefaultFreigthCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory) {

        http.on("/orders", "post", async function (params: any, body: any) {
            const placeOrderController = new PlaceOrderController(repositoryFactory);
            return placeOrderController.execute(params, body);
        });

        http.on("/orders", "get", async function (params: any, body: any) {
            const getOrdersController = new GetOrdersController(repositoryFactory);
            return getOrdersController.execute(params, body);
        })

        http.on("/orders/:code", "get", async function (params: any, body: any) {
            const getOrderController = new GetOrderController(repositoryFactory);
            return getOrderController.execute(params, body);
        })

        http.on("/simulate-freigth", "post", async function (params: any, body: any) {
            const simulateFreigth = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreigthCalculator());
            const input = body;
            return await simulateFreigth.execute(input);
        });
    }
}
