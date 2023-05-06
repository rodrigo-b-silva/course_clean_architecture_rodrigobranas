import ValidatorCoupon from "../../src/application/useCase/ValidatorCoupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

test("Deve validar o cupom de desconto existente", async function() {
    const couponRepository = new CouponRepositoryMemory();
    const validatorCoupon = new ValidatorCoupon(couponRepository);
    const input = {
        code: 'VALE20'
    };
    const output = await validatorCoupon.execute(input);
    expect(output.valid).toBeTruthy();
});

test("Deve invalidar o cupom de desconto inexistente", async function() {
    const couponRepository = new CouponRepositoryMemory();
    const validatorCoupon = new ValidatorCoupon(couponRepository);
    const input = {
        code: 'VALE100'
    };
    const output = await validatorCoupon.execute(input);
    expect(output.valid).toBeFalsy();
});