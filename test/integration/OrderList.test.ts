import OrderList from "../../src/application/useCase/orderList/OrderList";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";


test("Deve retornar a lista de pedidos", async function() {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const orderRepository = new OrderRepositoryDatabase(connection);
    const count = await orderRepository.count();
    const orderList = new OrderList(orderRepository);
    const orders = await orderList.execute();
    expect(orders.length).toBe(count);
});