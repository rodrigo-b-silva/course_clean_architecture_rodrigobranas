export default class CreateStockInput {
  constructor(readonly idItem: number, readonly unitName: string, readonly unit: string, readonly quantity: number = 0) { }
}
