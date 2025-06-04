import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../../product/entities/product.entity";
import { OrderEntity } from "./order.entity";

@Entity("order_products")
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  totalProduct: number;

  @ManyToOne(() => OrderEntity, (order) => order.products, {
    onDelete: "CASCADE",
    nullable: false,
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, {
    onDelete: "CASCADE",
    nullable: false,
    eager: true,
  })
  product: ProductEntity;
}
