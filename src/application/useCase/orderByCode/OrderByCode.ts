import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderByCode {
    constructor(readonly orderRepository: OrderRepository) {
    }

    async execute(code: string): Promise<Order> {
        const order = await this.orderRepository.findByCode(code);
        if(!order) throw new Error("Order not found");
        return order;
    }
}