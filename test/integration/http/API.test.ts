import axios from "axios";
import PlaceOrder from "../../../src/application/useCase/place_order/PlaceOrder";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import Broker from "../../../src/infra/broker/Broker";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;

beforeEach(function () {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection);
    const repositoryFactory = new DatabaseRepositoryFactory();
    const broker = new Broker();
    placeOrder = new PlaceOrder(repositoryFactory, broker);
})

test("Deve testar a API /orders (POST)", async function () {
    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "post",
        data: {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ],
            date: new Date("2023-05-03"),
            coupon: "VALE20"
        }
    });
    const order = response.data;
    expect(order.total).toBe(138);
})

test("Deve testar a API /simulate-freigth (POST)", async function () {
    const response = await axios({
        url: "http://localhost:3000/simulate-freigth",
        method: "post",
        data: {
            items: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ]
        }
    });
    const output = response.data;
    expect(output.amount).toBe(260);
})

test("Deve testar a API /orders (GET)", async function () {
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
    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "get"
    });
    const orders = response.data;
    expect(orders.orders).toHaveLength(1);
})

test("Deve testar a API /orders/code (GET)", async function () {
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
    const response = await axios({
        url: "http://localhost:3000/orders/202100000001",
        method: "get"
    });
    const order = response.data;
    expect(order.code).toBe('202100000001');
})

afterEach(async function () {
    await orderRepository.clear();
})
