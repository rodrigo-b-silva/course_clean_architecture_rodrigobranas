import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;
  MINIMUM_FREIGHT = 10;
  STANDARD_DISTANCE = 1000;
  freight = 0;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    this.freight += this.calculateFreightItem(item, quantity);
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal() {
    let total = 0;
    for(const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if(this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    return total;
  }

  calculateFreightItem(item: Item, quantity: number) {
    const freightItem = (this.STANDARD_DISTANCE * item.getVolume() * (item.getDensity()/100));
    return freightItem * quantity;
  }

  getFreight() {
    if(this.freight < this.MINIMUM_FREIGHT) return this.MINIMUM_FREIGHT;
    return this.freight;
  }
}