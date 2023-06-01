import PlaceOrder from "../../application/useCase/place_order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";

export default class PlaceOrderController {
    constructor(readonly repositoryFactory: RepositoryFactory, readonly broker: Broker) {
    }

    async execute(params: any, body: any) {
        const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker);
        const input = body;
        input.date = new Date(input.date);
        return await placeOrder.execute(input);
    }
}
