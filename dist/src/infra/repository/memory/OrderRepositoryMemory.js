"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderRepositoryMemory {
    constructor() {
        this.orders = [];
        this.sequence = 0;
    }
    save(order) {
        const year = order.date.getFullYear();
        this.sequence++;
        order.code = year + String(this.sequence).padStart(8, '0');
        this.orders.push(order);
        return Promise.resolve(order);
    }
}
exports.default = OrderRepositoryMemory;
