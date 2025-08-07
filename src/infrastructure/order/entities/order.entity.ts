import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentStatus } from "../../../domain/payment/paymentStatus";
import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { OrderProductEntity } from "./orderProduct.entity";


@Entity("orders")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  totalOrder: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.RECEBIDO })
  status: OrderStatus;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDENTE })
  paymentStatus: PaymentStatus;

  @Column({ nullable: true })
  pix: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => CustomerEntity, { nullable: true, eager: true })
  customer: CustomerEntity | null;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  products: OrderProductEntity[];
}
