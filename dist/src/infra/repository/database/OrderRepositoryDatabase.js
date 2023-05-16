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
const Order_1 = __importDefault(require("../../../domain/entity/Order"));
class OrderRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    save(order) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *", [order.getCode(), order.getCpf(), order.date, order.getFreigth(), order.sequence, (_a = order.coupon) === null || _a === void 0 ? void 0 : _a.code]);
            for (const orderItem of order.getOrderItems()) {
                yield this.connection.query("insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $3)", [orderItem.idItem, orderData.id_order, orderItem.price, orderItem.quantity]);
            }
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("select count(*)::int as count from ccca.order", []);
            return orderData.count;
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("select *from ccca.order where code = $1", [code]);
            if (!orderData)
                return;
            return new Order_1.default(orderData.cpf, orderData.issue_date, orderData.freigth, orderData.sequence);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersData = yield this.connection.query("select *from ccca.order", []);
            let orderList = [];
            for (const orderData of ordersData) {
                orderList.push(new Order_1.default(orderData.cpf, orderData.issue_date, orderData.freight, orderData.sequence));
            }
            return orderList;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("delete from ccca.order_item", []);
            yield this.connection.query("delete from ccca.order", []);
        });
    }
}
exports.default = OrderRepositoryDatabase;
