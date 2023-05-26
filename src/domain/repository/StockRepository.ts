import Stock from "../entity/Stock";

export default interface StockRepository {
  save(stock: Stock): Promise<void>;
  getStock(code: string): Promise<Stock>;
  getQuantity(code: string): Promise<number>;
  increase(code: string, quantity: number): Promise<void>;
  reduce(code: string, quantity: number): Promise<void>;
  count(idItem: number): Promise<number>;
}
