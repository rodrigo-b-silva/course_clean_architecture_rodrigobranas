import OrderDAO from "../../application/dao/OrderDAO";
import GetOrder from "../../application/query/getOrder/GetOrder";

export default class GetOrderController {
  constructor(readonly orderDAO: OrderDAO) {
  }

  async execute(params: any, body: any) {
    const getOrder = new GetOrder(this.orderDAO);
    const getOrderOutput = await getOrder.execute(params.code);
    return getOrderOutput;
  }
}
