import ValidateCoupon from "../../../src/application/useCase/validate_coupon/ValidateCoupon";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../../src/infra/repository/database/CouponRepositoryDatabase";
import CouponRepositoryMemory from "../../../src/infra/repository/memory/CouponRepositoryMemory";

test("Deve validar o cupom de desconto", async function () {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const couponRepository = new CouponRepositoryDatabase(connection);
    const validateCoupon = new ValidateCoupon(couponRepository);
    const isValid = await validateCoupon.execute("VALE20");
    expect(isValid).toBeTruthy();
});
