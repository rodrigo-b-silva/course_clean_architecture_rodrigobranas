import OrderByCode from "../../src/application/useCase/orderByCode/OrderByCode";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let orderByCode: OrderByCode;

beforeEach(function() {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const orderRepository = new OrderRepositoryDatabase(connection);
    orderByCode = new OrderByCode(orderRepository);
});

test("Deve retornar um pedido com base no código", async function() {
    const orderCode = "202300000001";
    const order = await orderByCode.execute(orderCode);
    expect(order.getCode()).toBe(orderCode);
});