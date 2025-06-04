import { NextFunction, Request, Response } from "express";
import { OrderStatus } from "../../../core/domain/order/entities/orderStatus";
import { OrderService } from "../../../core/application/order/services/order.service";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      next(error);
    }
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    const orderId = parseInt(req.params.id, 10);
    try {
      const status = await this.orderService.updateOrderStatus(orderId);
      res.status(200).send({ status });
    } catch (error: any) {
      next(error);
    }
  }

  async listOrdersByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.params.status as OrderStatus;
      const orders = await this.orderService.listOrdersByStatus(status);
      res.status(200).json(orders);
    } catch (error: any) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = parseInt(req.params.id, 10);
      const orders = await this.orderService.getOrderById(orderId);
      res.status(200).json(orders);
    } catch (error: any) {
      next(error);
    }
  }

  async listAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.listAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      next(error);
    }
  }
}
