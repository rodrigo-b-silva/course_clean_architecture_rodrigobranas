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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateStock_1 = __importDefault(require("../../../src/application/useCase/manipulateStock/CreateStock"));
const IncreaseStock_1 = __importDefault(require("../../../src/application/useCase/manipulateStock/IncreaseStock"));
const StockRepositoryMemory_1 = __importDefault(require("../../../src/infra/repository/memory/StockRepositoryMemory"));
let createStock;
let increaseStock;
beforeEach(function () {
    const stockRepository = new StockRepositoryMemory_1.default();
    createStock = new CreateStock_1.default(stockRepository);
    increaseStock = new IncreaseStock_1.default(stockRepository);
});
test("Deve criar e salvar um estoque e retornar o código", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            idItem: 4,
            unitName: 'cor',
            unit: 'vermelha',
            quantity: 2
        };
        const output = yield createStock.execute(input);
        expect(output.code).toBe('4-01');
    });
});
test("Deve criar e salvar um estoque e retornar a quantidade 5", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            idItem: 4,
            unitName: 'cor',
            unit: 'vermelha',
            quantity: 5
        };
        const output = yield createStock.execute(input);
        expect(output.quantity).toBe(5);
    });
});
test("Deve aumentar a quantidade de estoque", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            codeStock: '6-01',
            quantity: 2
        };
        const output = yield increaseStock.execute(input.codeStock, input.quantity);
        expect(output.quantity).toBe(12);
    });
});
