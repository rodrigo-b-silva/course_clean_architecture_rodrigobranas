"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateStockInput {
    constructor(idItem, unitName, unit, quantity = 0) {
        this.idItem = idItem;
        this.unitName = unitName;
        this.unit = unit;
        this.quantity = quantity;
    }
}
exports.default = CreateStockInput;
