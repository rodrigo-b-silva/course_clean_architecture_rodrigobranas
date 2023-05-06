import CouponRepository from "../../domain/repository/CouponRepository";
import ValidatorCouponInput from "./ValidatorCouponInput";
import ValidatorCouponOutput from "./ValidatorCouponOutput";

export default class ValidatorCoupon {
    constructor(readonly couponRepository: CouponRepository) {

    }

    async execute(input: ValidatorCouponInput): Promise<ValidatorCouponOutput> {
        const valid = await this.couponRepository.findByCode(input.code);
        const output = new ValidatorCouponOutput(!!valid);
        return output;
    }
}