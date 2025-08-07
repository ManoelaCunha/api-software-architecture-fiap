import { NextFunction, Request, Response } from "express";
import { PaymentService } from "../../application/payment/services/payment.service";

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  async mockPaymentWebhook(req: Request, res: Response, next: NextFunction) {
    const { orderId, status } = req.body;
    try {
      const paymentStatus = await this.paymentService.mockPaymentWebhook(orderId, status);
      res.status(201).send({ paymentStatus });
    } catch (error: any) {
      next(error);
    }
  }

  async getPaymentStatus(req: Request, res: Response, next: NextFunction) {
    const orderId = parseInt(req.params.orderId, 10);
    try {
      const paymentStatus = await this.paymentService.getStatusPayment(orderId);
      res.status(200).json({ paymentStatus });
    } catch (error: any) {
      next(error);
    }
  }
}
