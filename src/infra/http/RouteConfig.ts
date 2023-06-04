import ItemDAO from "../../application/dao/ItemDAO";
import OrderDAO from "../../application/dao/OrderDAO";
import SimulateFreigth from "../../application/useCase/simulate_freight/SimulateFreigth";
import ValidateCoupon from "../../application/useCase/validate_coupon/ValidateCoupon";
import DefaultFreigthCalculator from "../../domain/entity/DefaultFreigthCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";
import GetItemsController from "../controller/GetItemsController";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory, orderDAO: OrderDAO, broker: Broker, itemDAO: ItemDAO) {

        http.on("/orders", "post", async function (params: any, body: any) {
            const placeOrderController = new PlaceOrderController(repositoryFactory, broker);
            return placeOrderController.execute(params, body);
        });

        http.on("/orders", "get", async function (params: any, body: any) {
            const getOrdersController = new GetOrdersController(orderDAO);
            return getOrdersController.execute(params, body);
        })

        http.on("/orders/:code", "get", async function (params: any, body: any) {
            const getOrderController = new GetOrderController(orderDAO);
            return getOrderController.execute(params, body);
        })

        http.on("/simulate-freigth", "post", async function (params: any, body: any) {
            const simulateFreigth = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreigthCalculator());
            const input = body;
            return await simulateFreigth.execute(input);
        });

        http.on("/validate-coupon", "post", async function (params: any, body: any) {
            const validateCoupon = new ValidateCoupon(new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()));
            const input = body;
            return await validateCoupon.execute(input.coupon);
        });

        http.on("/items", "get", async function (params: any, body: any) {
            const getItemsController = new GetItemsController(itemDAO);
            return getItemsController.execute(params, body);
        });
    }
}
