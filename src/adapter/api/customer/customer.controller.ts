import { NextFunction, Request, Response } from "express";
import { CustomerService } from "../../../core/application/customer/services/customer.service";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await this.customerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (error: any) {
      next(error);
    }
  }

  async getCustomerByCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const customer = await this.customerService.findCustomerByCpf(cpf);
      res.status(200).json(customer);
    } catch (error: any) {
      next(error);
    }
  }
}
