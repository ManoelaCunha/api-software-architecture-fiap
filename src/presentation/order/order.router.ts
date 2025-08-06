import { Router, Application } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "../../application/order/services/order.service";
import { PaymentService } from "../../application/payment/services/payment.service";
import { OrderRepository } from "../../infrastructure/order/repositories/order.repository";
import { ProductRepository } from "../../infrastructure/product/repositories/product.repository";
import { CustomerRepository } from "../../infrastructure/customer/repositories/customer.repository";
import { PaymentRepository } from "../../infrastructure/payment/repositories/payment.repository";

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const customerRepository = new CustomerRepository();
const paymentRepository = new PaymentRepository();

const paymentService = new PaymentService(paymentRepository);
const orderService = new OrderService(
  orderRepository,
  productRepository,
  customerRepository,
  paymentService
);

const orderController = new OrderController(orderService);

const router = Router();

const orderRouter = (app: Application) => {
  router.post("/order", (req, res, next) =>
    orderController.createOrder(req, res, next)
  );
  router.put("/order/:id/status", (req, res, next) =>
    orderController.updateOrderStatus(req, res, next)
  );
  router.get("/order/status/:status", (req, res, next) =>
    orderController.listOrdersByStatus(req, res, next)
  );
  router.get("/order/:id", (req, res, next) =>
    orderController.getOrderById(req, res, next)
  );
  router.get("/orders", (req, res, next) =>
    orderController.listAllOrders(req, res, next)
  );

  app.use(router);
};

export { orderRouter };
