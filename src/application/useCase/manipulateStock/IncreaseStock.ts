import StockRepository from "../../../domain/repository/StockRepository";
import StockOutput from "./StockOutput";

export default class IncreaseStock {
  constructor(readonly stockRepository: StockRepository) {
  }

  async execute(codeStock: string, quantity: number): Promise<StockOutput> {
    await this.stockRepository.increase(codeStock, quantity);
    const newQuantity = await this.stockRepository.getQuantity(codeStock);
    const output = new StockOutput(codeStock, newQuantity);
    return output;
  }

}
