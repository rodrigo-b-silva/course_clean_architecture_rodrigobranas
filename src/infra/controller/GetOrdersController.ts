import GetOrders from "../../application/useCase/getOrders/GetOrders";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrdersController {
  constructor(readonly repositoryFactory: RepositoryFactory) {
  }

  async execute(params: any, body: any) {
    const getOrders = new GetOrders(this.repositoryFactory);
    const getOrdersOutput = await getOrders.execute();
    return getOrdersOutput;
  }
}
