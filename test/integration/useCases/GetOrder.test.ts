import GetOrder from "../../../src/application/useCase/getOrder/GetOrder";
import PlaceOrder from "../../../src/application/useCase/place_order/PlaceOrder";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import Broker from "../../../src/infra/broker/Broker";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepository;

beforeEach(function () {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection);
    // const repositoryFactory = new MemoryRepositoryFactory();
    const repositoryFactory = new DatabaseRepositoryFactory();
    const broker = new Broker();
    placeOrder = new PlaceOrder(repositoryFactory, broker);
    getOrder = new GetOrder(repositoryFactory);
})

test("Deve retornar um pedido pelo código", async function () {
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
    const placeOrderOutput = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
    // expect(getOrderOutput.code).toBe("202100000001");
    expect(getOrderOutput.total).toBe(138);
});

afterEach(async function () {
    await orderRepository.clear();
})
