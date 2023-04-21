import Coupon from "../src/Coupon";

test('Não deve criar cupom sem código de código', function() {
  expect(() => new Coupon('', 10, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'))
});

test('Não deve criar um cupom com desconto menor ou igual a zero', function() {
  expect(() => new Coupon('VALE10', 0, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'))
});

test('Não deve criar um cupom com desconto maior que 100%', function() {
  expect(() => new Coupon('VALE10', 101, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'))
});

test("Não deve criar um cupom com data expirada", function () {
  expect(() => new Coupon('VALE10', 10, new Date('2023-04-20'))).toThrow(new Error('Coupon has expired date'))
});

test('Deve criar um cupom com valores válidos', function() {
  expect(() => new Coupon('VALE100', 100, new Date('2023-04-21'))).toBeTruthy();
});