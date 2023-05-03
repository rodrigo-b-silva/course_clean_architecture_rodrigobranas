"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultFreigthCalculator {
    calculate(item) {
        if (!item.width || !item.height || !item.length || !item.weight)
            return 0;
        const freigth = (1000 * item.getVolume() * (item.getDensity() / 100));
        const minFreugth = 10;
        return Math.max(minFreugth, freigth);
    }
}
exports.default = DefaultFreigthCalculator;
