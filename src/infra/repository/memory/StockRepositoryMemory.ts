import Stock from "../../../domain/entity/Stock";
import StockCode from "../../../domain/entity/StockCode";
import StockRepository from "../../../domain/repository/StockRepository";

export default class StockRepositoryMemory implements StockRepository {
  stock: Stock[];

  constructor() {
    this.stock = [
      new Stock(6, 'comprimento', '5m', 10, 1)
    ];
  }

  save(stock: Stock): Promise<void> {
    this.stock.push(stock);
    return Promise.resolve();
  }

  getStock(code: string): Promise<Stock> {
    const stock = this.stock.find(stock => stock.getCode() === code);
    if (!stock) throw new Error('Stock not found');
    return Promise.resolve(stock);
  }

  getQuantity(code: string): Promise<number> {
    const stock = this.stock.find(stock => stock.getCode() === code);
    if (!stock) throw new Error('Stock not found');
    return Promise.resolve(stock.getQuantity())
  }

  increase(code: string, quantity: number): Promise<void> {
    const stockIndex = this.stock.findIndex(stock => stock.getCode() === code);
    if (stockIndex < 0) throw new Error('Stock not found');
    const newQuantity = this.stock[stockIndex].getQuantity() + quantity;
    this.stock[stockIndex].setQuantity(newQuantity);
    return Promise.resolve();
  }

  reduce(code: string, quantity: number): Promise<void> {
    const stockIndex = this.stock.findIndex(stock => stock.getCode() === code);
    if (stockIndex < 0) throw new Error('Stock not found');
    let newQuantity = this.stock[stockIndex].getQuantity() - quantity;
    newQuantity = Math.max(newQuantity, 0);
    this.stock[stockIndex].setQuantity(newQuantity);
    return Promise.resolve();
  }

  count(idItem: number): Promise<number> {
    const countStockByItem = this.stock.filter(stock => stock.idItem === idItem).length;
    return Promise.resolve(countStockByItem);
  }
}
