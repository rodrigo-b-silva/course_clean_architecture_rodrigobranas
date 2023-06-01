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
const SimulateFreigth_1 = __importDefault(require("../../../src/application/useCase/simulate_freight/SimulateFreigth"));
const SimulateFreigthInput_1 = __importDefault(require("../../../src/application/useCase/simulate_freight/SimulateFreigthInput"));
const DefaultFreigthCalculator_1 = __importDefault(require("../../../src/domain/entity/DefaultFreigthCalculator"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/ItemRepositoryDatabase"));
test("Deve simular o frete dos itens", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = PgPromiseConnectionAdapter_1.default.getInstance();
        const itemRepository = new ItemRepositoryDatabase_1.default(connection);
        const freigthCalculator = new DefaultFreigthCalculator_1.default();
        const simulateFreigth = new SimulateFreigth_1.default(itemRepository, freigthCalculator);
        const input = new SimulateFreigthInput_1.default([
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ]);
        const output = yield simulateFreigth.execute(input);
        expect(output.amount).toBe(260);
    });
});
