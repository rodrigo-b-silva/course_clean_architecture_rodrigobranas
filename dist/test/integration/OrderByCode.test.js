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
const OrderByCode_1 = __importDefault(require("../../src/application/useCase/orderByCode/OrderByCode"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PgPromiseConnectionAdapter"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/OrderRepositoryDatabase"));
let orderByCode;
beforeEach(function () {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    const orderRepository = new OrderRepositoryDatabase_1.default(connection);
    orderByCode = new OrderByCode_1.default(orderRepository);
});
test("Deve retornar um pedido com base no código", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const orderCode = "202300000001";
        const order = yield orderByCode.execute(orderCode);
        expect(order.getCode()).toBe(orderCode);
    });
});
