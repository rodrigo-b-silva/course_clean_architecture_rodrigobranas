import OrderDAO from "../../dao/OrderDAO";
import GetOrdersOutput from "./GetOrdersOutput";

export default class GetOrders {
  constructor(readonly orderDAO: OrderDAO) { }

  async execute(): Promise<GetOrdersOutput> {
    const getOrdersOutput = new GetOrdersOutput();
    const ordersData = await this.orderDAO.findAll();
    for (const orderData of ordersData) {
      getOrdersOutput.addOrder(orderData.code, orderData.total);
    }
    return getOrdersOutput;
  }
}
