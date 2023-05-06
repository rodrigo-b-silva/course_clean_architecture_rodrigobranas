import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    sequence: number;

    constructor() {
        this.orders = [];
        this.sequence = 0;
    }

    save(order: Order): Promise<Order> {
        const year = order.date.getFullYear();
        this.sequence++;
        order.code = year + String(this.sequence).padStart(8, '0'); 
        this.orders.push(order);
        return Promise.resolve(order);
    }
}