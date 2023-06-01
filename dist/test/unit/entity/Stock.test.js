"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = __importDefault(require("../../../src/domain/entity/Stock"));
test("Deve criar 5 items de guitarra vermelha em estoque", function () {
    const stock = new Stock_1.default(4, 'cor', 'vermelha', 5);
    const quantity = stock.getQuantity();
    expect(quantity).toBe(5);
});
test("Deve criar 5 items de guitarra vermelha em estoque e gerar código sequencial", function () {
    const stock = new Stock_1.default(4, 'cor', 'vermelha', 5);
    const code = stock.getCode();
    expect(code).toBe('4-01');
});
