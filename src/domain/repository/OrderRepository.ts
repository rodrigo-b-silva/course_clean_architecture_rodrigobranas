import Order from "../entity/Order";

export default interface OrderRepository {
    save(order: Order): Promise<void>;
    get(code: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    count(): Promise<number>;
    findByCode(code: string): Promise<Order | undefined>;
    list(): Promise<Order[]>;
    clear(): Promise<void>;
}
