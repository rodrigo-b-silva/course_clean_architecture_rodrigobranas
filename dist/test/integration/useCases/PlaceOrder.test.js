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
const GetStock_1 = __importDefault(require("../../../src/application/useCase/getStock/GetStock"));
const PlaceOrder_1 = __importDefault(require("../../../src/application/useCase/place_order/PlaceOrder"));
const Broker_1 = __importDefault(require("../../../src/infra/broker/Broker"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../../src/infra/factory/DatabaseRepositoryFactory"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/OrderRepositoryDatabase"));
const StockEntryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/StockEntryRepositoryDatabase"));
let placeOrder;
let getStock;
let orderRepository;
let stockEntryRepository;
beforeEach(function () {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    orderRepository = new OrderRepositoryDatabase_1.default(connection);
    stockEntryRepository = new StockEntryRepositoryDatabase_1.default(connection);
    // const repositoryFactory = new MemoryRepositoryFactory();
    const repositoryFactory = new DatabaseRepositoryFactory_1.default();
    const broker = new Broker_1.default();
    broker.register(new OrderPlacedStockHandler_1.default(repositoryFactory));
    placeOrder = new PlaceOrder_1.default(repositoryFactory, broker);
    getStock = new GetStock_1.default(repositoryFactory);
});
test("Deve fazer um pedido e retornar total", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ],
            date: new Date("2023-05-03"),
            coupon: "VALE20"
        };
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(138);
    });
});
test("Deve fazer um pedido com cálculo de frete", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2023-05-03")
        };
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(6350);
    });
});
test("Deve fazer um pedido com código", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2023-05-03")
        };
        const output = yield placeOrder.execute(input);
        expect(output.code).toBe("202300000001");
    });
});
test("Deve fazer um pedido e retirar do estoque", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2023-05-03")
        };
        yield placeOrder.execute(input);
        const totalA = yield getStock.execute(4);
        const totalB = yield getStock.execute(5);
        const totalC = yield getStock.execute(6);
        expect(totalA).toBe(-1);
        expect(totalB).toBe(-1);
        expect(totalC).toBe(-3);
    });
});
afterEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield stockEntryRepository.clear();
        yield orderRepository.clear();
    });
});
