"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = __importDefault(require("../../../domain/entity/Stock"));
class StockRepositoryMemory {
    constructor() {
        this.stock = [
            new Stock_1.default(6, 'comprimento', '5m', 10, 1)
        ];
    }
    save(stock) {
        this.stock.push(stock);
        return Promise.resolve();
    }
    getStock(code) {
        const stock = this.stock.find(stock => stock.getCode() === code);
        if (!stock)
            throw new Error('Stock not found');
        return Promise.resolve(stock);
    }
    getQuantity(code) {
        const stock = this.stock.find(stock => stock.getCode() === code);
        if (!stock)
            throw new Error('Stock not found');
        return Promise.resolve(stock.getQuantity());
    }
    increase(code, quantity) {
        const stockIndex = this.stock.findIndex(stock => stock.getCode() === code);
        if (stockIndex < 0)
            throw new Error('Stock not found');
        const newQuantity = this.stock[stockIndex].getQuantity() + quantity;
        this.stock[stockIndex].setQuantity(newQuantity);
        return Promise.resolve();
    }
    reduce(code, quantity) {
        const stockIndex = this.stock.findIndex(stock => stock.getCode() === code);
        if (stockIndex < 0)
            throw new Error('Stock not found');
        let newQuantity = this.stock[stockIndex].getQuantity() - quantity;
        newQuantity = Math.max(newQuantity, 0);
        this.stock[stockIndex].setQuantity(newQuantity);
        return Promise.resolve();
    }
    count(idItem) {
        const countStockByItem = this.stock.filter(stock => stock.idItem === idItem).length;
        return Promise.resolve(countStockByItem);
    }
}
exports.default = StockRepositoryMemory;
