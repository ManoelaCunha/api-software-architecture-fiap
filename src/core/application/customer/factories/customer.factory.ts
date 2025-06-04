import { Customer } from "../../../domain/customer/entities/customer";
import { CustomerDTO } from "../dtos/customer.dto";

export class CustomerFactory {
  static create(customer: CustomerDTO): Customer {
    const { id, name, email, cpf } = customer;
    return new Customer(id!, name, email, cpf);
  }
}
