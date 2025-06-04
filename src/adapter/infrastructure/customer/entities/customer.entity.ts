import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderEntity } from "../../order/entities/order.entity";

@Entity("customers")
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => OrderEntity, (order) => order.customer, {
    cascade: true,
  })
  orders: OrderEntity[];
}
