import { Router, Application } from "express";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "../../application/payment/services/payment.service";
import { PaymentRepository } from "../../infrastructure/payment/repositories/payment.repository";

const paymentRepository = new PaymentRepository();

const paymentService = new PaymentService(paymentRepository);

const paymentController = new PaymentController(paymentService);

const router = Router();

const paymentRouter = (app: Application) => {
  router.post("/mock/payment/status", (req, res, next) =>
    paymentController.mockPaymentWebhook(req, res, next)
  );
  router.get("/payment/:orderId", (req, res, next) =>
    paymentController.getPaymentStatus(req, res, next)
  );

  app.use(router);
};

export { paymentRouter };
