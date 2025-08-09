import { Order } from "../../../domain/order/entities/order";
import { CPF } from "../../../domain/customer/value-objects/cpf";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { OrderProduct } from "../../../domain/order/entities/orderProduct";

import { IOrderRepository } from "../../../domain/order/interfaces/order.interface";
import { IProductRepository } from "../../../domain/product/interfaces/product.interface";
import { ICustomerRepository } from "../../../domain/customer/interfaces/customer.interface";

import { OrderProductFactory } from "../factories/orderProduct.factory";
import { OrderFactory } from "../factories/order.factory";

import { PaymentService } from "../../payment/services/payment.service";
import { ApplicationError } from "../../_errors/application.error";
import { CreateOrderDTO } from "../dtos/order.create.dto";

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private customerRepository: ICustomerRepository,
    private paymentService: PaymentService
  ) {}

  async createOrder(order: CreateOrderDTO): Promise<Order> {
    const products: OrderProduct[] = [];

    for (const product of order.products) {
      const { productId, quantity } = product;
      const productEntity = await this.productRepository.findById(productId);

      if (!productEntity) {
        throw new ApplicationError("Produto não existe!", 404);
      }

      products.push(
        OrderProductFactory.create({ product: productEntity, quantity })
      );
    }

    let customer;
    if (order.cpf) {
      const cpf = CPF.validation(order.cpf).isValid;
      customer = (await this.customerRepository.findByCpf(cpf)) ?? undefined;
    }

    const newOrder = OrderFactory.create({ products, customer });
    const orderCreated = await this.orderRepository.createOrder(newOrder);

    try {
      // Gera QRCode PIX
      const paymentPixCreated = await this.paymentService.createPixPayment(
        orderCreated.id!,
        orderCreated.totalOrder,
        orderCreated.customer
      );

      // Salva QRCode PIX → "fake checkout" do pedido como PENDENTE
      const updatePaymentOrder = await this.paymentService.updatePixPayment(
        orderCreated.id!,
        paymentPixCreated
      );

      return updatePaymentOrder;
    } catch (error) {
      console.error(error);
      // Falhou → "fake checkout" do pedido como CANCELADO
      await this.paymentService.updatePixPayment(orderCreated.id!);
      throw new ApplicationError("Erro ao gerar o QR Code do PIX", 500);
    }
  }

  async updateOrderStatus(orderId: number): Promise<OrderStatus> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new ApplicationError("Pedido não existe!", 404);
    }

    order.updateOrderStatus();

    return await this.orderRepository.updateStatus(orderId, order.status);
  }

  async listOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    const orders = await this.orderRepository.findByStatus(status);

    if (orders.length === 0) {
      throw new ApplicationError("Nenhum pedido encontrado!", 404);
    }

    return orders;
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new ApplicationError("Pedido não existe!", 404);
    }

    return order;
  }

  async listAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();

    if (orders.length === 0) {
      throw new ApplicationError("Nenhum pedido encontrado!", 404);
    }

    return orders;
  }
}
