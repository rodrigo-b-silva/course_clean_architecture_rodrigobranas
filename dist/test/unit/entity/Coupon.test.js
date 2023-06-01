"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../../src/domain/entity/Coupon"));
test("Deve criar um cupom de desconto válido", function () {
    const coupon = new Coupon_1.default("VALE20", 20, new Date('2023-04-25'));
    const today = new Date('2023-04-21');
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});
test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon_1.default("VALE20", 20, new Date('2023-04-01'));
    const today = new Date('2023-04-21');
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
});
test("Deve criar um cupom de desconto válido e calcular o desconto", function () {
    const coupon = new Coupon_1.default("VALE20", 20, new Date('2023-04-25'));
    const today = new Date('2023-04-24');
    const discount = coupon.calculateDiscount(1000, today);
    expect(discount).toBe(200);
});
