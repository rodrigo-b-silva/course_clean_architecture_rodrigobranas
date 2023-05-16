"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderRepositoryMemory {
    constructor() {
        this.orders = [];
        this.sequence = 0;
    }
    save(order) {
        this.orders.push(order);
        return Promise.resolve();
    }
    count() {
        return Promise.resolve(this.orders.length);
    }
    findByCode(code) {
        return Promise.resolve(this.orders.find(order => order.getCode() === code));
    }
    list() {
        return Promise.resolve(this.orders);
    }
    clear() {
        this.orders = [];
        return Promise.resolve();
    }
}
exports.default = OrderRepositoryMemory;
