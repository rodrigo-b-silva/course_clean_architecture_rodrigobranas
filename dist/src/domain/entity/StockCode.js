"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockCode {
    constructor(idItem, sequence) {
        this.value = this.generateCode(idItem, sequence);
    }
    generateCode(idItem, sequence) {
        return `${idItem}-${sequence.toString().padStart(2, '0')}`;
    }
}
exports.default = StockCode;
