"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../../domain/entity/Coupon"));
class CouponRepositoryMemory {
    constructor() {
        this.coupons = [
            new Coupon_1.default('VALE10', 10),
            new Coupon_1.default('VALE20', 20),
            new Coupon_1.default('VALE30', 30)
        ];
    }
    findByCode(code) {
        return Promise.resolve(this.coupons.find(coupon => code === coupon.code));
    }
}
exports.default = CouponRepositoryMemory;
