import { OrderProduct } from "../../../domain/order/entities/orderProduct";
import { ProductFactory } from "../../product/factories/product.factory";
import { OrderProductDTO } from "../dtos/orderProduct.dto";

export class OrderProductFactory {
  static create(orderProduct: OrderProductDTO): OrderProduct {
    const { id, quantity } = orderProduct;

    const product = ProductFactory.create(orderProduct.product);

    return new OrderProduct(id!, product, quantity);
  }
}
