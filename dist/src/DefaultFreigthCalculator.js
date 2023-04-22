"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultFreigthCalculator {
    calculate(item) {
        const freigth = (1000 * item.getVolume() * (item.getDensity() / 100));
        const minFreugth = 10;
        return Math.max(minFreugth, freigth);
    }
}
exports.default = DefaultFreigthCalculator;
