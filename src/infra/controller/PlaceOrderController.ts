import PlaceOrder from "../../application/useCase/place_order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";

export default class PlaceOrderController {
    constructor(readonly repositoryFactory: RepositoryFactory) {
    }

    async execute(params: any, body: any) {
        const placeOrder = new PlaceOrder(this.repositoryFactory);
        const input = body;
        input.date = new Date(input.date);
        return await placeOrder.execute(input);
    }
}