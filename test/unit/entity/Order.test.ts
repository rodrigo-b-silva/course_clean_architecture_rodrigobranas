import Coupon from "../../../src/domain/entity/Coupon";
import DefaultFreigthCalculator from "../../../src/domain/entity/DefaultFreigthCalculator";
import FixedFreigthCalculator from "../../../src/domain/entity/FixedFreigthCalculator";
import Item from "../../../src/domain/entity/Item";
import Order from "../../../src/domain/entity/Order";

test("Deve criar um pedido vazio com CPF válido", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  const total = order.getTotal();
  expect(total).toBe(0);
});

test("Deve tentar criar um pedido vazio com CPF inválido", function () {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido com 3 itens", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
  const total = order.getTotal();
  expect(total).toBe(160);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(128);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto expirado com a estratégia default", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date('2023-04-02'), new DefaultFreigthCalculator());
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
  order.addCoupon(new Coupon("VALE20", 20, new Date('2023-04-01')));
  const total = order.getTotal();
  expect(total).toBe(160);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia fixo", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date('2023-04-02'), new FixedFreigthCalculator());
  order.addItem(new Item(4, "Instrumentos musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(5, "Instrumentos musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
  const freigth = order.getFreigth();
  expect(freigth).toBe(50);
});

test("Deve criar um pedido com código", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date('2023-04-02'), new FixedFreigthCalculator());
  order.addItem(new Item(4, "Instrumentos musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(5, "Instrumentos musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
  const code = order.getCode();
  expect(code).toBe("202300000001");
});
