import StockCode from "./StockCode";

export default class Stock {
  private code: StockCode;

  constructor(readonly idItem: number, readonly unitName: string, readonly unit: string, private quantity: number, readonly sequence: number = 1) {
    this.code = new StockCode(idItem, sequence)
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getCode() {
    return this.code.value;
  }
}
