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
const OrderController_1 = require("../../controlles/OrderController");
const PgPromiseConnectionAdapter_1 = __importDefault(require("../database/PgPromiseConnectionAdapter"));
const OrderRepositoryDatabase_1 = __importDefault(require("../repository/database/OrderRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../repository/database/ItemRepositoryDatabase"));
const CouponRepositoryDatabase_1 = __importDefault(require("../repository/database/CouponRepositoryDatabase"));
const makeOrderController = () => {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    const itemRepository = new ItemRepositoryDatabase_1.default(connection);
    const orderRepository = new OrderRepositoryDatabase_1.default(connection);
    const couponRepository = new CouponRepositoryDatabase_1.default(connection);
    return new OrderController_1.OrderController(itemRepository, orderRepository, couponRepository);
};
exports.default = (router) => {
    router.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield makeOrderController().save(req, res); }));
    router.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield makeOrderController().list(req, res); }));
    router.get("/orders/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield makeOrderController().findByCode(req, res); }));
};
