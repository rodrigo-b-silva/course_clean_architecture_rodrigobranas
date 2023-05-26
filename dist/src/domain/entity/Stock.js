"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockCode_1 = __importDefault(require("./StockCode"));
class Stock {
    constructor(idItem, unitName, unit, quantity, sequence = 1) {
        this.idItem = idItem;
        this.unitName = unitName;
        this.unit = unit;
        this.quantity = quantity;
        this.sequence = sequence;
        this.code = new StockCode_1.default(idItem, sequence);
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    getCode() {
        return this.code.value;
    }
}
exports.default = Stock;
