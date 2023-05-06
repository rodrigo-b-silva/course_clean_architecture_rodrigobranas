"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultFreigthCalculator {
    calculate(item) {
        if (!item.width || !item.height || !item.length || !item.weight)
            return 0;
        const freigth = (1000 * item.getVolume() * (item.getDensity() / 100));
        const minFreigth = 10;
        return Math.max(minFreigth, freigth);
    }
}
exports.default = DefaultFreigthCalculator;
