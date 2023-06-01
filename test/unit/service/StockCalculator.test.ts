import StockEntity from "../../../src/domain/entity/StockEntry";
import StockCalculator from "../../../src/domain/service/StockCalculator";

test("Deve calcular o estoque disponivel para um item", function () {
  const calculator = new StockCalculator();
  const stockEntries = [
    new StockEntity(1, "in", 10, new Date("2023-06-01T10:00:00")),
    new StockEntity(1, "out", 5, new Date("2023-06-02T10:00:00")),
  ];
  const total = calculator.calculate(stockEntries);
  expect(total).toBe(5);
})
