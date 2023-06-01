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
const GetStock_1 = __importDefault(require("../../../src/application/useCase/getStock/GetStock"));
const SaveStock_1 = __importDefault(require("../../../src/application/useCase/saveStock/SaveStock"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../../src/infra/factory/DatabaseRepositoryFactory"));
const StockEntryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/StockEntryRepositoryDatabase"));
test("Deve obter o estoque de um item", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const repositoryFactory = new DatabaseRepositoryFactory_1.default();
        const stockEntityRepository = repositoryFactory.createStockEntryRepository();
        yield stockEntityRepository.clear();
        const saveStock = new SaveStock_1.default(repositoryFactory);
        const saveStockInputA = {
            idItem: 1,
            operation: 'in',
            quantity: 10
        };
        yield saveStock.execute(saveStockInputA);
        const saveStockInputB = {
            idItem: 1,
            operation: 'out',
            quantity: 5
        };
        yield saveStock.execute(saveStockInputB);
        const getStock = new GetStock_1.default(repositoryFactory);
        const total = yield getStock.execute(1);
        expect(total).toBe(5);
    });
});
afterEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = PgPromiseConnectionAdapter_1.default.getInstance();
        const stockEntryRepository = new StockEntryRepositoryDatabase_1.default(connection);
        yield stockEntryRepository.clear();
    });
});
