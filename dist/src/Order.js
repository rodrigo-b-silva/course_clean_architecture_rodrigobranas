"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const DefaultFreigthCalculator_1 = __importDefault(require("./DefaultFreigthCalculator"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf, date = new Date(), freigthCalculator = new DefaultFreigthCalculator_1.default()) {
        this.date = date;
        this.freigthCalculator = freigthCalculator;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freigth = 0;
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
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= this.coupon.calculateDiscount(total, this.date);
        }
        return total;
    }
}
exports.default = Order;
