export default class VolumeItem {
  constructor(readonly height: number, readonly width: number, readonly depth: number) {}

  getVolume() {
    return (this.height / 100) * (this.width / 100) * (this.depth / 100);
  }
}