import CreateStock from "../../src/application/useCase/manipulateStock/CreateStock"
import CreateStockInput from "../../src/application/useCase/manipulateStock/CreateStockInput"
import IncreaseStock from "../../src/application/useCase/manipulateStock/IncreaseStock";
import StockRepositoryMemory from "../../src/infra/repository/memory/StockRepositoryMemory"

let createStock: CreateStock;
let increaseStock: IncreaseStock;

beforeEach(function () {
  const stockRepository = new StockRepositoryMemory();
  createStock = new CreateStock(stockRepository);
  increaseStock = new IncreaseStock(stockRepository);
})

test("Deve criar e salvar um estoque e retornar o código", async function () {
  const input = {
    idItem: 4,
    unitName: 'cor',
    unit: 'vermelha',
    quantity: 2
  }
  const output = await createStock.execute(input);
  expect(output.code).toBe('4-01')
})

test("Deve criar e salvar um estoque e retornar a quantidade 5", async function () {
  const input = {
    idItem: 4,
    unitName: 'cor',
    unit: 'vermelha',
    quantity: 5
  }

  const output = await createStock.execute(input);
  expect(output.quantity).toBe(5)
})

test("Deve aumentar a quantidade de estoque", async function () {
  const input = {
    codeStock: '6-01',
    quantity: 2
  }
  const output = await increaseStock.execute(input.codeStock, input.quantity);
  expect(output.quantity).toBe(12)
})
