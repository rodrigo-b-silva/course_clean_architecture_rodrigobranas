"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorCoupon_1 = __importDefault(require("../../src/application/useCase/ValidatorCoupon"));
const CouponRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/CouponRepositoryMemory"));
test("Deve validar o cupom de desconto existente", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const couponRepository = new CouponRepositoryMemory_1.default();
        const validatorCoupon = new ValidatorCoupon_1.default(couponRepository);
        const input = {
            code: 'VALE20'
        };
        const output = yield validatorCoupon.execute(input);
        expect(output.valid).toBeTruthy();
    });
});
test("Deve invalidar o cupom de desconto inexistente", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const couponRepository = new CouponRepositoryMemory_1.default();
        const validatorCoupon = new ValidatorCoupon_1.default(couponRepository);
        const input = {
            code: 'VALE100'
        };
        const output = yield validatorCoupon.execute(input);
        expect(output.valid).toBeFalsy();
    });
});
