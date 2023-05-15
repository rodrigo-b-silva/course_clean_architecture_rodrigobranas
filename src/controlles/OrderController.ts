import { Request, Response } from 'express'
import OrderList from '../application/useCase/orderList/OrderList'
import OrderRepositoryDatabase from '../infra/repository/database/OrderRepositoryDatabase';
import Connection from '../infra/database/PgPromiseConnectionAdapter';
import OrderRepository from '../domain/repository/OrderRepository';
import Order from '../domain/entity/Order';
import OrderByCode from '../application/useCase/orderByCode/OrderByCode';
import PlaceOrder from '../application/useCase/place_order/PlaceOrder';
import ItemRepository from '../domain/repository/ItemRepository';
import CouponRepository from '../domain/repository/CouponRepository';

export class OrderController {
    private orderList: OrderList;
    private orderByCode: OrderByCode;
    private placeOrder: PlaceOrder;
    
    constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {
        this.orderList = new OrderList(orderRepository);
        this.orderByCode = new OrderByCode(orderRepository);
        this.placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    }

    async list(req: Request, res: Response): Promise<any> {
        try {
            const orders = await this.orderList.execute();
            return res.status(200).json(orders);
        } catch(err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao listar pedidos" });
        }
    }

    async findByCode(req: Request, res: Response): Promise<any> {
        try {
            const { code } = req.params;
            const order = await this.orderByCode.execute(code);
            return res.status(200).json(order);
        } catch(err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar produto" });
        }
    }

    async save(req: Request, res: Response): Promise<any> {
        try {
            const orderBody = req.body;
            console.log(orderBody)
            const input = {
                cpf: orderBody.cpf, 
                orderItems: orderBody.orderItems, 
                date: orderBody.date
            };
            const response = await this.placeOrder.execute(input);
            return res.status(200).json(response);
        } catch(err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao salvar produto" });
        }
    }
}