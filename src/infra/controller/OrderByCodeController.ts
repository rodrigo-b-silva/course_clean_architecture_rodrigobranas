import OrderByCode from "../../application/useCase/orderByCode/OrderByCode";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class OrderByCodeController {
  constructor(readonly orderRepository: OrderRepository) { }

  async execute(params: any, body: any) {
    const { code } = params
    const orderByCode = new OrderByCode(this.orderRepository)
    return await orderByCode.execute(code)
  }
}

/**
 * codeItem, qtd
 */
