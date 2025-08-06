import dotenv from "dotenv";

import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { OrderEntity } from "../../order/entities/order.entity";

import { MercadoPagoConfig, Payment } from "mercadopago";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { Order } from "../../../domain/order/entities/order";
import { Customer } from "../../../domain/customer/entities/customer";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { IPaymentRepository } from "../../../application/payment/interfaces/payment.interface";
import { OrderFactory } from "../../../application/order/factories/order.factory";
import { OrderDTO } from "../../../application/order/dtos/order.dto";

dotenv.config();

export class PaymentRepository implements IPaymentRepository {
  private accessToken: string;
  private ormRepository: Repository<OrderEntity>;

  constructor() {
    this.accessToken = process.env.MP_ACCESS_TOKEN!;
    this.ormRepository = AppDataSource.getRepository(OrderEntity);
  }

  async createPixPayment(
    orderId: number,
    total: number,
    customer?: Customer
  ): Promise<PaymentResponse> {
    const client = new MercadoPagoConfig({
      accessToken: this.accessToken,
      options: { timeout: 5000 },
    });

    const newPayment = new Payment(client);

    const body = {
      transaction_amount: total,
      description: `Pedido #${orderId}`,
      payment_method_id: "pix",
      payer: {
        email: customer?.email || "teste@example.com",
        first_name: customer?.name || "Cliente Teste",
      },
      external_reference: String(orderId),
    };

    const paymentCreated: PaymentResponse = await newPayment.create({ body });

    return paymentCreated;
  }

  async updatePixPayment(
    orderId: number,
    status: OrderStatus,
    pix?: string
  ): Promise<Order> {
    await this.ormRepository.update(orderId as number, {
      pix,
      status,
      payment: !!pix,
    });

    const order = await this.ormRepository.findOneBy({ id: orderId });

    return OrderFactory.create(order as OrderDTO);
  }
}
