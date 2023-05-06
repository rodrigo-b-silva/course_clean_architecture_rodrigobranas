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
const ValidatorCouponOutput_1 = __importDefault(require("./ValidatorCouponOutput"));
class ValidatorCoupon {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield this.couponRepository.findByCode(input.code);
            const output = new ValidatorCouponOutput_1.default(!!valid);
            return output;
        });
    }
}
exports.default = ValidatorCoupon;
