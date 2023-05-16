import PlaceOrder from "../../src/application/useCase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;

beforeEach(function() {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection);
    // const repositoryFactory = new MemoryRepositoryFactory();
    const repositoryFactory = new DatabaseRepositoryFactory();
    placeOrder = new PlaceOrder(repositoryFactory);    
})

test("Deve fazer um pedido e retornar total", async function() {
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        date: new Date("2023-05-03"),
        coupon: "VALE20"
    }
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(138);
});

test("Deve fazer um pedido com cálculo de frete", async function() {
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2023-05-03")
    }
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com código", async function() {
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2023-05-03")
    }
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202300000001");
});

afterEach(async function() {
    await orderRepository.clear();
})