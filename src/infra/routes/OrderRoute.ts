import { Router } from "express";
import { OrderController } from "../../controlles/OrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";

const makeOrderController = (): OrderController => {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const orderRepository = new OrderRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryDatabase(connection);
    return new OrderController(itemRepository, orderRepository, couponRepository);
}

export default (router: Router): void => {
    router.post("/orders", async (req, res) => await makeOrderController().save(req, res))
    router.get("/orders", async (req, res) => await makeOrderController().list(req, res))
    router.get("/orders/:code", async (req, res) => await makeOrderController().findByCode(req, res))
}