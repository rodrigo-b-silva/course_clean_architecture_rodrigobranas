import Item from "./Item";

export default interface FreigthCalculator {
  calculate(item: Item): number;
}