import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { CustomerEntity } from "../entities/customer.entity";

import { Customer } from "../../../domain/customer/entities/customer";
import { CustomerFactory } from "../../../application/customer/factories/customer.factory";
import { ICustomerRepository } from "../../../domain/customer/interfaces/customer.interface";


export class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<CustomerEntity>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CustomerEntity);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const customerEntity = this.ormRepository.create({
      cpf: customer.cpf,
      name: customer.name,
      email: customer.email,
    });

    const savedCustomer = await this.ormRepository.save(customerEntity);

    return CustomerFactory.create(savedCustomer);
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customerEntity = await this.ormRepository.findOneBy({ cpf });
    if (!customerEntity) return null;
    return CustomerFactory.create(customerEntity);
  }
}
