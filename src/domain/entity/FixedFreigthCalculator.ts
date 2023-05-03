import FreigthCalculator from "./FreightCalculator";
import Item from "./Item";

export default class FixedFreigthCalculator implements FreigthCalculator {
  calculate(item: Item): number {
    return 10;
  }
}