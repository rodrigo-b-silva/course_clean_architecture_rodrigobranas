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
    get(code) {
        const order = this.orders.find(order => order.getCode() === code);
        if (!order)
            throw new Error('Order not found');
        return Promise.resolve(order);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orders;
        });
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
