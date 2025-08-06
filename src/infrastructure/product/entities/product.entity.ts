import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderProductEntity } from "../../order/entities/orderProduct.entity";
import { ProductCategory } from "../../../domain/product/entities/productCategory";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  price: number;

  @Column({
    type: "enum",
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product, {
    cascade: true,
  })
  orderProducts: OrderProductEntity[];
}
