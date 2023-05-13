import FreigthCalculator from "../../../domain/entity/FreightCalculator";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreigthInput from "./SimulateFreigthInput";
import SimulateFreigthOutput from "./SimulateFreigthOutput";

export default class SimulateFreigth {
    constructor(readonly itemRepository: ItemRepository, readonly freigthCalculator: FreigthCalculator) {
    }

    async execute(input: SimulateFreigthInput): Promise<SimulateFreigthOutput> {
        let amount = 0;
        for(const inputItem of input.items) {
            const item = await this.itemRepository.findById(inputItem.idItem);
            if(!item) throw new Error("Item not found");
            amount += this.freigthCalculator.calculate(item) * inputItem.quantity;
        }
        return new SimulateFreigthOutput(amount);
    }

}