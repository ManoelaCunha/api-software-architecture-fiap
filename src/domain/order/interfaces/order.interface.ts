import { Order } from "../entities/order";
import { OrderStatus } from "../entities/orderStatus";

export interface IOrderRepository {
  createOrder(order: Order): Promise<Order>;
  updateStatus(orderId: number, status: OrderStatus): Promise<OrderStatus>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findById(orderId: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
