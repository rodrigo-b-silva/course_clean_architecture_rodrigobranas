"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../src/Coupon"));
test('Não deve criar cupom sem código de código', function () {
    expect(() => new Coupon_1.default('', 10, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'));
});
test('Não deve criar um cupom com desconto menor ou igual a zero', function () {
    expect(() => new Coupon_1.default('VALE10', 0, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'));
});
test('Não deve criar um cupom com desconto maior que 100%', function () {
    expect(() => new Coupon_1.default('VALE10', 101, new Date('2023-04-21'))).toThrow(new Error('Coupon invalid'));
});
test("Não deve criar um cupom com data expirada", function () {
    expect(() => new Coupon_1.default('VALE10', 10, new Date('2023-04-20'))).toThrow(new Error('Coupon has expired date'));
});
test('Deve criar um cupom com valores válidos', function () {
    expect(() => new Coupon_1.default('VALE100', 100, new Date('2023-04-21'))).toBeTruthy();
});
