import { Router, Application } from "express";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "../../infrastructure/customer/repositories/customer.repository";
import { CustomerService } from "../../../core/application/customer/services/customer.service";

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const router = Router();

const customerRouter = (app: Application) => {
  router.post("/customer", (req, res, next) =>
    customerController.createCustomer(req, res, next)
  );
  router.get("/customer/:cpf", (req, res, next) =>
    customerController.getCustomerByCpf(req, res, next)
  );

  app.use(router);
};

export { customerRouter };
