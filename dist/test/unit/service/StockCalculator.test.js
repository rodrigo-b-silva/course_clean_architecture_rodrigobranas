"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockEntry_1 = __importDefault(require("../../../src/domain/entity/StockEntry"));
const StockCalculator_1 = __importDefault(require("../../../src/domain/service/StockCalculator"));
test("Deve calcular o estoque disponivel para um item", function () {
    const calculator = new StockCalculator_1.default();
    const stockEntries = [
        new StockEntry_1.default(1, "in", 10, new Date("2023-06-01T10:00:00")),
        new StockEntry_1.default(1, "out", 5, new Date("2023-06-02T10:00:00")),
    ];
    const total = calculator.calculate(stockEntries);
    expect(total).toBe(5);
});
