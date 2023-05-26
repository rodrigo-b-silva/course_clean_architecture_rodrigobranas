export default class StockCode {
  readonly value: string;

  constructor(idItem: number, sequence: number) {
    this.value = this.generateCode(idItem, sequence)
  }

  generateCode(idItem: number, sequence: number) {
    return `${idItem}-${sequence.toString().padStart(2, '0')}`
  }
}
