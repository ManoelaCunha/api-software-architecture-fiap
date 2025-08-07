import { Order } from "../../../domain/order/entities/order";
import { Customer } from "../../../domain/customer/entities/customer";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export interface IPaymentRepository {
  createPixPayment(
    orderId: number,
    total: number,
    customer?: Customer
  ): Promise<PaymentResponse>;
  updatePixPayment(
    orderId: number,
    status: OrderStatus,
    pix?: string
  ): Promise<Order>;
  getStatusPayment(orderId: number): Promise<string | null>;
  mockPaymentWebhook(orderId: number, paymentStatus: string): Promise<string | null>;
}
