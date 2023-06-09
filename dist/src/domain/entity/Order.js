"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const DefaultFreigthCalculator_1 = __importDefault(require("./DefaultFreigthCalculator"));
const OrderCode_1 = __importDefault(require("./OrderCode"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf, date = new Date(), freigthCalculator = new DefaultFreigthCalculator_1.default(), sequence = 1) {
        this.date = date;
        this.freigthCalculator = freigthCalculator;
        this.sequence = sequence;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freigth = 0;
        this.code = new OrderCode_1.default(date, sequence);
    }
    addItem(item, quantity) {
        this.freigth += this.freigthCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity));
    }
    addCoupon(coupon) {
        if (coupon.isExpired(this.date))
            return;
        this.coupon = coupon;
    }
    getFreigth() {
        return this.freigth;
    }
    getCode() {
        return this.code.value;
    }
    getCpf() {
        return this.cpf.value;
    }
    getOrderItems() {
        return this.orderItems;
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= this.coupon.calculateDiscount(total, this.date);
        }
        total += this.getFreigth();
        return total;
    }
}
exports.default = Order;
