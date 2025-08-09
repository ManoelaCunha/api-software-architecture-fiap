import { IPaymentRepository } from "../../../domain/payment/interfaces/payment.interface";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { ApplicationError } from "../../_errors/application.error";

export class PaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async createPixPayment(
    orderId: number,
    total: number,
    customer?: any
  ): Promise<string> {
    const paymentCreated = await this.paymentRepository.createPixPayment(
      orderId,
      total,
      customer
    );
    return paymentCreated.point_of_interaction?.transaction_data?.ticket_url!;
  }

  async updatePixPayment(orderId: number, pix?: string) {
    const status = !pix ? OrderStatus.CANCELADO : OrderStatus.PENDENTE;
    return await this.paymentRepository.updatePixPayment(orderId, status, pix!);
  }

  async mockPaymentWebhook(orderId: number, paymentStatus: string) {
    const newPaymentStatus = await this.paymentRepository.mockPaymentWebhook(orderId, paymentStatus);

    if (!newPaymentStatus) {
      throw new ApplicationError("Pedido não existe!", 404);
    }

    return newPaymentStatus;
  }

  async getStatusPayment(orderId: number) {
    const paymentStatus = await this.paymentRepository.getStatusPayment(orderId);

    if (!paymentStatus) {
      throw new ApplicationError("Pedido não existe!", 404);
    }

    return paymentStatus;
  }
}
