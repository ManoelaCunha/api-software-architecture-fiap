import { Customer } from "../../../domain/customer/entities/customer";

export interface ICustomerRepository {
  createCustomer(customer: Customer): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer | null>;
}
