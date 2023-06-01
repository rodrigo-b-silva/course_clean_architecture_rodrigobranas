import StockEntity from "../entity/StockEntry";

export default class StockCalculator {
  calculate(stockEntries: StockEntity[]) {
    let total = 0;
    for (const stockEntry of stockEntries) {
      if (stockEntry.operation === 'in') total += stockEntry.quantity;
      if (stockEntry.operation === 'out') total -= stockEntry.quantity;
    }
    return total;
  }
}
