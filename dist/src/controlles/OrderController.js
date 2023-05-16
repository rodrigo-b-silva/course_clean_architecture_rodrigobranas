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
exports.OrderController = void 0;
const OrderList_1 = __importDefault(require("../application/useCase/orderList/OrderList"));
const OrderByCode_1 = __importDefault(require("../application/useCase/orderByCode/OrderByCode"));
const PlaceOrder_1 = __importDefault(require("../application/useCase/place_order/PlaceOrder"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../infra/factory/DatabaseRepositoryFactory"));
class OrderController {
    constructor(itemRepository, orderRepository, couponRepository) {
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
        this.factoryRepository = new DatabaseRepositoryFactory_1.default();
        this.orderList = new OrderList_1.default(orderRepository);
        this.orderByCode = new OrderByCode_1.default(orderRepository);
        this.placeOrder = new PlaceOrder_1.default(this.factoryRepository);
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.orderList.execute();
                return res.status(200).json(orders);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Erro ao listar pedidos" });
            }
        });
    }
    findByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.params;
                const order = yield this.orderByCode.execute(code);
                return res.status(200).json(order);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Erro ao buscar produto" });
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderBody = req.body;
                console.log(orderBody);
                const input = {
                    cpf: orderBody.cpf,
                    orderItems: orderBody.orderItems,
                    date: orderBody.date
                };
                const response = yield this.placeOrder.execute(input);
                return res.status(200).json(response);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Erro ao salvar produto" });
            }
        });
    }
}
exports.OrderController = OrderController;
