import PlaceOrder from "../../application/useCase/place_order/PlaceOrder";
import SimulateFreigth from "../../application/useCase/simulate_freight/SimulateFreigth";
import DefaultFreigthCalculator from "../../domain/entity/DefaultFreigthCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory) {

        http.on("/orders", "post", async function(params: any, body: any) {
            const placeOrderController = new PlaceOrderController(repositoryFactory);
            return placeOrderController.execute(params, body);
        });
        
        http.on("/simulate-freigth", "post", async function(params: any, body: any) {
            const simulateFreigth = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreigthCalculator());
            const input = body;
            return await simulateFreigth.execute(input);
        });
    }
}