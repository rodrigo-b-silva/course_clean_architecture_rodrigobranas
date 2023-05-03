import FreigthCalculator from "./FreightCalculator";
import Item from "./Item";

export default class DefaultFreigthCalculator implements FreigthCalculator {
  calculate(item: Item) {
    if(!item.width || !item.height || !item.length || !item.weight) return 0;
    const freigth = (1000 * item.getVolume() * (item.getDensity()/100));
    const minFreugth = 10;
    return Math.max(minFreugth, freigth);
  }
}