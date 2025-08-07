import { Order } from "../../../domain/order/entities/order";
import { CustomerFactory } from "../../customer/factories/customer.factory";
import { OrderProductFactory } from "./orderProduct.factory";
import { OrderDTO } from "../dtos/order.dto";

export class OrderFactory {
  static create(order: OrderDTO): Order {
    const { id, status, createdDate, updatedDate, pix, paymentStatus } = order;

    const products = order.products.map((product) =>
      OrderProductFactory.create(product)
    );

    let customer;
    if (order.customer) {
      customer = CustomerFactory.create(order.customer);
    }

    return new Order(
      id!,
      products,
      customer,
      status,
      createdDate,
      updatedDate,
      pix,
      paymentStatus
    );
  }
}
