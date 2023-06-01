"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockEntry_1 = __importDefault(require("../../../src/domain/entity/StockEntry"));
test("Deve criar uma entrada no estoque", function () {
    const stockEntity = new StockEntry_1.default(1, "in", 10, new Date("2023-06-01T10:00:00"));
    expect(stockEntity.idItem).toBe(1);
    expect(stockEntity.operation).toBe('in');
    expect(stockEntity.quantity).toBe(10);
    expect(stockEntity.date).toEqual(new Date("2023-06-01T10:00:00"));
});
