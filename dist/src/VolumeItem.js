"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VolumeItem {
    constructor(height, width, depth) {
        this.height = height;
        this.width = width;
        this.depth = depth;
    }
    getVolume() {
        return (this.height / 100) * (this.width / 100) * (this.depth / 100);
    }
}
exports.default = VolumeItem;
