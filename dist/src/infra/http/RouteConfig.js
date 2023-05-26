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
const ListOrderController_1 = __importDefault(require("../controller/ListOrderController"));
const PlaceOrderController_1 = __importDefault(require("../controller/PlaceOrderController"));
class RouteConfig {
    constructor(http, repositoryFactory) {
        http.on("/orders", "post", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const placeOrderController = new PlaceOrderController_1.default(repositoryFactory);
                return placeOrderController.execute(params, body);
            });
        });
        http.on("/orders", "get", function (params, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const placeOrderController = new ListOrderController_1.default(repositoryFactory.createOrderRepository());
                return placeOrderController.execute(params, body);
            });
        });
        // http.on("/simulate-freigth", "post", async function(params: any, body: any) {
        //     const simulateFreigth = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreigthCalculator());
        //     const input = body;
        //     return await simulateFreigth.execute(input);
        // });
    }
}
exports.default = RouteConfig;
