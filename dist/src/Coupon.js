"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, percentage, expireDate) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
        this.validate();
    }
    validate() {
        if (!this.code)
            throw new Error('Coupon invalid');
        if (this.percentage <= 0 || this.percentage > 100)
            throw new Error('Coupon invalid');
        if (new Date() > this.expireDate)
            throw new Error('Coupon has expired date');
    }
}
exports.default = Coupon;
