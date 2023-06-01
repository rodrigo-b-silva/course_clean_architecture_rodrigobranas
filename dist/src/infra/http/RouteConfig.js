"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimulateFreigth_1 = __importDefault(require("../../application/useCase/simulate_freight/SimulateFreigth"));
const DefaultFreigthCalculator_1 = __importDefault(require("../../domain/entity/DefaultFreigthCalculator"));
const GetOrderController_1 = __importDefault(require("../controller/GetOrderController"));
const GetOrdersController_1 = __importDefault(require("../controller/GetOrdersController"));
const PlaceOrderController_1 = __importDefault(require("../controller/PlaceOrderController"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../database/PgPromiseConnectionAdapter"));
const ItemRepositoryDatabase_1 = __importDefault(require("../repository/database/ItemRepositoryDatabase"));
class RouteConfig {
    constructor(http, repositoryFactory, orderDAO, broker) {
        http.on("/orders", "post", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const placeOrderController = new PlaceOrderController_1.default(repositoryFactory, broker);
                return placeOrderController.execute(params, body);
            });
        });
        http.on("/orders", "get", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const getOrdersController = new GetOrdersController_1.default(orderDAO);
                return getOrdersController.execute(params, body);
            });
        });
        http.on("/orders/:code", "get", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const getOrderController = new GetOrderController_1.default(orderDAO);
                return getOrderController.execute(params, body);
            });
        });
        http.on("/simulate-freigth", "post", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const simulateFreigth = new SimulateFreigth_1.default(new ItemRepositoryDatabase_1.default(PgPromiseConnectionAdapter_1.default.getInstance()), new DefaultFreigthCalculator_1.default());
                const input = body;
                return yield simulateFreigth.execute(input);
            });
        });
    }
}
exports.default = RouteConfig;
