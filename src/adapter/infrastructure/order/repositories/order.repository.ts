import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";

import { Order } from "../../../../core/domain/order/entities/order";
import { OrderStatus } from "../../../../core/domain/order/entities/orderStatus";
import { OrderDTO } from "../../../../core/application/order/dtos/order.dto";
import { OrderFactory } from "../../../../core/application/order/factories/order.factory";
import { IOrderRepository } from "../../../../core/application/order/interfaces/order.interface";

import { OrderEntity } from "../entities/order.entity";
import { OrderProductEntity } from "../entities/orderProduct.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<OrderEntity>;
  private ormOrderProductRepository: Repository<OrderProductEntity>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(OrderEntity);
    this.ormOrderProductRepository =
      AppDataSource.getRepository(OrderProductEntity);
  }

  async createOrder(order: Order): Promise<Order> {
    const orderProductEntity = order.products.map((product) => {
      return this.ormOrderProductRepository.create({
        product: { id: product.product.id } as ProductEntity,
        quantity: product.quantity,
        totalProduct: product.totalProduct,
      });
    });

    const orderEntity = this.ormRepository.create({
      products: orderProductEntity,
      customer: { id: order?.customer?.id } as CustomerEntity,
      status: order.status,
      totalOrder: order.totalOrder,
      createdDate: order.createdDate,
      updatedDate: order.updatedDate,
    });

    const savedOrder = await this.ormRepository.save(orderEntity);

    return OrderFactory.create({
      ...order,
      id: savedOrder.id,
      products: savedOrder.products.map((savedProduct, i) => ({
        id: savedProduct.id,
        product: order.products[i].product,
        quantity: savedProduct.quantity,
        totalProduct: savedProduct.totalProduct,
      })),
    } as OrderDTO);
  }

  async updateStatus(
    orderId: number,
    status: OrderStatus
  ): Promise<OrderStatus> {
    await this.ormRepository.update(orderId, {
      status,
      updatedDate: new Date(),
    });
    return status;
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const orderEntity = await this.ormRepository.find({
      where: { status },
    });
    return orderEntity.map((order) => {
      return OrderFactory.create(order as OrderDTO);
    });
  }

  async findById(orderId: number): Promise<Order | null> {
    const orderEntity = await this.ormRepository.findOneBy({ id: orderId });
    if (!orderEntity) return null;
    return OrderFactory.create(orderEntity as OrderDTO);
  }

  async findAll(): Promise<Order[]> {
    const orderEntities = await this.ormRepository.find({
      relations: ["products", "customer"],
    });
    return orderEntities.map((order) => {
      return OrderFactory.create(order as OrderDTO);
    });
  }
}
