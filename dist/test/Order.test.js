"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../src/Coupon"));
const Item_1 = __importDefault(require("../src/Item"));
const Order_1 = __importDefault(require("../src/Order"));
const VolumeItem_1 = __importDefault(require("../src/VolumeItem"));
test("Deve criar um pedido vazio com CPF válido", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});
test("Deve tentar criar um pedido vazio com CPF inválido", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order_1.default(cpf)).toThrow(new Error("Invalid cpf"));
});
test("Deve criar um pedido com 3 itens", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "CD", 30, 0.1, new VolumeItem_1.default(5, 10, 10)), 3);
    order.addItem(new Item_1.default(2, "Vídeo", "DVD", 50, 0.2, new VolumeItem_1.default(5, 10, 10)), 1);
    order.addItem(new Item_1.default(3, "Vídeo", "VHS", 10, 0.4, new VolumeItem_1.default(4, 15, 20)), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "CD", 30, 0.1, new VolumeItem_1.default(5, 10, 10)), 3);
    order.addItem(new Item_1.default(2, "Vídeo", "DVD", 50, 0.2, new VolumeItem_1.default(5, 10, 10)), 1);
    order.addItem(new Item_1.default(3, "Vídeo", "VHS", 10, 0.4, new VolumeItem_1.default(4, 15, 20)), 2);
    order.addCoupon(new Coupon_1.default("VALE20", 20, new Date('2023-04-21T22:00:00')));
    const total = order.getTotal();
    expect(total).toBe(128);
});
test('Deve calcular o preço do frete do pedido com valor mínimo', function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(4, "Vídeo", "Camera", 310, 1, new VolumeItem_1.default(20, 15, 10)), 2);
    const freight = order.getFreight();
    expect(freight).toBe(10);
});
