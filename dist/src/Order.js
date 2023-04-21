"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf) {
        this.MINIMUM_FREIGHT = 10;
        this.STANDARD_DISTANCE = 1000;
        this.freight = 0;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
    }
    addItem(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity));
        this.freight += this.calculateFreightItem(item, quantity);
    }
    addCoupon(coupon) {
        this.coupon = coupon;
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= (total * this.coupon.percentage) / 100;
        }
        return total;
    }
    calculateFreightItem(item, quantity) {
        const freightItem = (this.STANDARD_DISTANCE * item.getVolume() * (item.getDensity() / 100));
        return freightItem * quantity;
    }
    getFreight() {
        if (this.freight < this.MINIMUM_FREIGHT)
            return this.MINIMUM_FREIGHT;
        return this.freight;
    }
}
exports.default = Order;
