import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {
    }
        
    async save(order: Order): Promise<void> {
        const [orderData] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *", 
        [order.getCode(), order.getCpf(), order.date, order.getFreigth(), order.sequence, order.coupon?.code]);
        for(const orderItem of order.getOrderItems()) {
            await this.connection.query("insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $3)", [orderItem.idItem, orderData.id_order, orderItem.price, orderItem.quantity]);
        }
    }

    async count(): Promise<number> {
        const [orderData] = await this.connection.query("select count(*)::int as count from ccca.order", []);
        return orderData.count;
    }
    
    async findByCode(code: string): Promise<Order | undefined> {
        const [orderData] = await this.connection.query("select *from ccca.order where code = $1", [code]);
        if(!orderData) return;
        return new Order(orderData.cpf, orderData.issue_date, orderData.freigth, orderData.sequence);
    }

    async list(): Promise<Order[]> {
        const ordersData = await this.connection.query("select *from ccca.order", []);
        let orderList = [];
        for(const orderData of ordersData) {
            orderList.push(new Order(orderData.cpf, orderData.issue_date, orderData.freight, orderData.sequence));
        }
        return orderList;
    }
} 