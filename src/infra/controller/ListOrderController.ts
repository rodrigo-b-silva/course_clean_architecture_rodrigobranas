import OrderList from "../../application/useCase/orderList/OrderList";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class OrderListController {
  constructor(readonly orderRepository: OrderRepository) { }

  async execute(params: any, body: any) {
    const orderList = new OrderList(this.orderRepository);
    return await orderList.execute();
  }
}
