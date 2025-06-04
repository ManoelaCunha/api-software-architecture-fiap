import { IPaymentRepository } from "../interfaces/payment.interface";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";

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
    let status = OrderStatus.RECEBIDO;
    if (!pix) {
      status = OrderStatus.CANCELADO;
    }
    return await this.paymentRepository.updatePixPayment(orderId, status, pix!);
  }
}
