export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expireDate: Date) {
    this.validate();
  }

  validate() {
    if(!this.code) throw new Error('Coupon invalid');
    if(this.percentage <= 0 || this.percentage > 100) throw new Error('Coupon invalid');
    if(new Date() > this.expireDate) throw new Error('Coupon has expired date')
  }
}