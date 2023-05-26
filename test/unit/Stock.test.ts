import Stock from "../../src/domain/entity/Stock"

test("Deve criar 5 items de guitarra vermelha em estoque", function () {
  const stock = new Stock(4, 'cor', 'vermelha', 5)
  const quantity = stock.getQuantity()
  expect(quantity).toBe(5)
})

test("Deve criar 5 items de guitarra vermelha em estoque e gerar código sequencial", function () {
  const stock = new Stock(4, 'cor', 'vermelha', 5)
  const code = stock.getCode()
  expect(code).toBe('4-01')
})
