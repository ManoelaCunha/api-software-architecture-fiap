import { ApplicationError } from "../../_errors/application.error";
import { Customer } from "../../../domain/customer/entities/customer";
import { CPF } from "../../../domain/customer/value-objects/cpf";
import { CustomerFactory } from "../factories/customer.factory";
import { ICustomerRepository } from "../../../domain/customer/interfaces/customer.interface";
import { CreateCustomerDTO } from "../dtos/customer.create.dto";

export class CustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = CustomerFactory.create(customer);

    const customerExists = await this.customerRepository.findByCpf(
      newCustomer.cpf
    );

    if (customerExists) {
      throw new ApplicationError("O CPF informado já existe!", 409);
    }

    return await this.customerRepository.createCustomer(newCustomer);
  }

  async findCustomerByCpf(cpf: string): Promise<Customer | null> {
    const cpfValid = CPF.validation(cpf).isValid;

    const customer = await this.customerRepository.findByCpf(cpfValid);

    if (!customer) {
      throw new ApplicationError("O CPF informado não existe!", 404);
    }

    return customer;
  }
}
