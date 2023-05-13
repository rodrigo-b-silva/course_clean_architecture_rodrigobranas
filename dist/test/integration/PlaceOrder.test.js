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
const PlaceOrder_1 = __importDefault(require("../../src/application/useCase/place_order/PlaceOrder"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PgPromiseConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/OrderRepositoryDatabase"));
let placeOrder;
beforeEach(function () {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    const itemRepository = new ItemRepositoryDatabase_1.default(connection);
    const orderRepository = new OrderRepositoryDatabase_1.default(connection);
    const couponRepository = new CouponRepositoryDatabase_1.default(connection);
    placeOrder = new PlaceOrder_1.default(itemRepository, orderRepository, couponRepository);
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
        // expect(output.code).toBe("202300000001");
    });
});
