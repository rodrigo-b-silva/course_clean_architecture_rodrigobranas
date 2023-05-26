import Stock from "../../../domain/entity/Stock";
import StockRepository from "../../../domain/repository/StockRepository";
import CreateStockInput from "./CreateStockInput";
import StockOutput from "./StockOutput";

export default class CreateStock {
  constructor(readonly stockRepository: StockRepository) {
  }

  async execute(input: CreateStockInput): Promise<StockOutput> {
    const sequence = await this.stockRepository.count(input.idItem) + 1;
    const stock = new Stock(input.idItem, input.unitName, input.unit, input.quantity, sequence);
    await this.stockRepository.save(stock);
    const output = new StockOutput(stock.getCode(), stock.getQuantity());
    return output;
  }
}
