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
const OrderPlacedStockHandler_1 = __importDefault(require("../../../src/application/handler/OrderPlacedStockHandler"));
const GetOrders_1 = __importDefault(require("../../../src/application/query/getOrders/GetOrders"));
const PlaceOrder_1 = __importDefault(require("../../../src/application/useCase/place_order/PlaceOrder"));
const Broker_1 = __importDefault(require("../../../src/infra/broker/Broker"));
const OrderDAODatabase_1 = __importDefault(require("../../../src/infra/dao/OrderDAODatabase"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../../src/infra/factory/DatabaseRepositoryFactory"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/OrderRepositoryDatabase"));
let placeOrder;
let getOrders;
let orderRepository;
beforeEach(function () {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    orderRepository = new OrderRepositoryDatabase_1.default(connection);
    // const repositoryFactory = new MemoryRepositoryFactory();
    const repositoryFactory = new DatabaseRepositoryFactory_1.default();
    const orderDAO = new OrderDAODatabase_1.default(connection);
    const broker = new Broker_1.default();
    broker.register(new OrderPlacedStockHandler_1.default(repositoryFactory));
    placeOrder = new PlaceOrder_1.default(repositoryFactory, broker);
    getOrders = new GetOrders_1.default(orderDAO);
});
test("Deve retornar a lista de pedidos", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 }
            ],
            date: new Date("2021-12-10"),
            coupon: "VALE20"
        };
        yield placeOrder.execute(input);
        const getOrdersOutput = yield getOrders.execute();
        expect(getOrdersOutput.orders).toHaveLength(1);
    });
});
afterEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield orderRepository.clear();
    });
});
