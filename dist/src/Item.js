"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(idItem, category, description, price, weight, volume) {
        this.idItem = idItem;
        this.category = category;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.volume = volume;
    }
    getDensity() {
        return this.weight / this.getVolume();
    }
    getVolume() {
        return this.volume.getVolume();
    }
}
exports.default = Item;
