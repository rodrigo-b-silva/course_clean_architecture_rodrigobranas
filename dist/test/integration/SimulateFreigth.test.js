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
const SimulateFreigth_1 = __importDefault(require("../../src/application/useCase/SimulateFreigth"));
const DefaultFreigthCalculator_1 = __importDefault(require("../../src/domain/entity/DefaultFreigthCalculator"));
const FixedFreigthCalculator_1 = __importDefault(require("../../src/domain/entity/FixedFreigthCalculator"));
const ItemRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/ItemRepositoryMemory"));
test('Deve simular o frete com estratégia fixa', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const itemRepository = new ItemRepositoryMemory_1.default();
        const fixedFreigthCalculator = new FixedFreigthCalculator_1.default();
        const simulateFreigth = new SimulateFreigth_1.default(fixedFreigthCalculator, itemRepository);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ]
        };
        const output = yield simulateFreigth.execute(input);
        expect(output.freight).toBe(50);
    });
});
test('Deve simular o frete com estratégia default', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const itemRepository = new ItemRepositoryMemory_1.default();
        const defaultFreigthCalculator = new DefaultFreigthCalculator_1.default();
        const simulateFreigth = new SimulateFreigth_1.default(defaultFreigthCalculator, itemRepository);
        const input = {
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 1 },
            ]
        };
        const output = yield simulateFreigth.execute(input);
        expect(output.freight).toBe(240);
    });
});
