import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    sequence: number;

    constructor() {
        this.orders = [];
        this.sequence = 0;
    }
        
    save(order: Order): Promise<void> {
        this.orders.push(order);
        return Promise.resolve();
    }
    
    count(): Promise<number> {
        return Promise.resolve(this.orders.length);
    }

    findByCode(code: string): Promise<Order | undefined> {
        return Promise.resolve(this.orders.find(order => order.getCode() === code));
    }

    list(): Promise<Order[]> {
        return Promise.resolve(this.orders);
    }

    clear(): Promise<void> {
        this.orders = [];
        return Promise.resolve();
    }
}