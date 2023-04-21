import VolumeItem from "./VolumeItem";

export default class Item {
  constructor(readonly idItem: number, readonly category: string, readonly description: string, readonly price: number, readonly weight: number, readonly volume: VolumeItem) {}
  
  getDensity() {
    return this.weight / this.getVolume();
  }
  
  getVolume() {
    return this.volume.getVolume();
  }
}