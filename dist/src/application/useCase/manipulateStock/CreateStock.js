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
const Stock_1 = __importDefault(require("../../../domain/entity/Stock"));
const StockOutput_1 = __importDefault(require("./StockOutput"));
class CreateStock {
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequence = (yield this.stockRepository.count(input.idItem)) + 1;
            const stock = new Stock_1.default(input.idItem, input.unitName, input.unit, input.quantity, sequence);
            yield this.stockRepository.save(stock);
            const output = new StockOutput_1.default(stock.getCode(), stock.getQuantity());
            return output;
        });
    }
}
exports.default = CreateStock;
