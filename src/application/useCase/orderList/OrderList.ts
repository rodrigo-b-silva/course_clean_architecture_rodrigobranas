import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderList {
    constructor(readonly orderRepository: OrderRepository) {

    }

    async execute(): Promise<Order[]> {
        const orders = await this.orderRepository.list();
        return orders;
    }
}