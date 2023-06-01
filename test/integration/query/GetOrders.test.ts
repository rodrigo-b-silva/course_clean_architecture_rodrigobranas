import OrderPlacedStockHandler from "../../../src/application/handler/OrderPlacedStockHandler";
import GetOrders from "../../../src/application/query/getOrders/GetOrders";
import PlaceOrder from "../../../src/application/useCase/place_order/PlaceOrder";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import Broker from "../../../src/infra/broker/Broker";
import OrderDAOatabase from "../../../src/infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
let orderRepository: OrderRepository;

beforeEach(function () {
  const connection = PgPromiseConnectionAdapter.getInstance()
  orderRepository = new OrderRepositoryDatabase(connection);
  // const repositoryFactory = new MemoryRepositoryFactory();
  const repositoryFactory = new DatabaseRepositoryFactory();
  const orderDAO = new OrderDAOatabase(connection);
  const broker = new Broker();
  broker.register(new OrderPlacedStockHandler(repositoryFactory))
  placeOrder = new PlaceOrder(repositoryFactory, broker);
  getOrders = new GetOrders(orderDAO);
})

test("Deve retornar a lista de pedidos", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    date: new Date("2021-12-10"),
    coupon: "VALE20"
  };
  await placeOrder.execute(input);
  const getOrdersOutput = await getOrders.execute();
  expect(getOrdersOutput.orders).toHaveLength(1);
});

afterEach(async function () {
  await orderRepository.clear();
})
