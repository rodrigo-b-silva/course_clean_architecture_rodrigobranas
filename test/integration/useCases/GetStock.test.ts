import GetStock from "../../../src/application/useCase/getStock/GetStock";
import SaveStock from "../../../src/application/useCase/saveStock/SaveStock";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory"
import StockEntryRepositoryDatabase from "../../../src/infra/repository/database/StockEntryRepositoryDatabase";

test("Deve obter o estoque de um item", async function () {
  const repositoryFactory = new DatabaseRepositoryFactory();
  const stockEntityRepository = repositoryFactory.createStockEntryRepository();
  await stockEntityRepository.clear();
  const saveStock = new SaveStock(repositoryFactory);
  const saveStockInputA = {
    idItem: 1,
    operation: 'in',
    quantity: 10
  }
  await saveStock.execute(saveStockInputA);
  const saveStockInputB = {
    idItem: 1,
    operation: 'out',
    quantity: 5
  }
  await saveStock.execute(saveStockInputB);
  const getStock = new GetStock(repositoryFactory);
  const total = await getStock.execute(1);
  expect(total).toBe(5);
})

afterEach(async function () {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  await stockEntryRepository.clear();
});
