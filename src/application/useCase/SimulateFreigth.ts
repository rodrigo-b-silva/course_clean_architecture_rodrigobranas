import FreigthCalculator from "../../domain/entity/FreightCalculator";
import ItemRepository from "../../domain/repository/ItemRepository";
import SimulateFreigthInput from "./SimulateFreigthInput";
import SimulateFreigthOutput from "./SimulateFreigthOutput";

export default class SimulateFreigth {
    constructor(readonly freigthCalculator: FreigthCalculator, readonly itemRepository: ItemRepository) {

    }

    async execute(input: SimulateFreigthInput): Promise<SimulateFreigthOutput> {
        let freight = 0;
        for(const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            if(!item) throw new Error("Item not found");
            freight += this.freigthCalculator.calculate(item) * orderItem.quantity;
        }
        const output = new SimulateFreigthOutput(freight);
        return output
    }

}