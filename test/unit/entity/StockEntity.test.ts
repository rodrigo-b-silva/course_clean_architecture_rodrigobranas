import StockEntity from "../../../src/domain/entity/StockEntry"

test("Deve criar uma entrada no estoque", function () {
  const stockEntity = new StockEntity(1, "in", 10, new Date("2023-06-01T10:00:00"));
  expect(stockEntity.idItem).toBe(1);
  expect(stockEntity.operation).toBe('in');
  expect(stockEntity.quantity).toBe(10);
  expect(stockEntity.date).toEqual(new Date("2023-06-01T10:00:00"));

})
