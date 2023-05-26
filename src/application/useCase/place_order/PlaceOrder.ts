import DefaultFreigthCalculator from "../../../domain/entity/DefaultFreigthCalculator";
import Order from "../../../domain/entity/Order";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
    orderRepository: OrderRepository;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.date, new DefaultFreigthCalculator(), sequence);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            if (!item) throw new Error("Item not found");
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        await this.orderRepository.save(order);
        const total = order.getTotal();
        const output = new PlaceOrderOutput(order.getCode(), total);
        return output;
    }
}
