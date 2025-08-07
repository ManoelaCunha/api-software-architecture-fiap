import dotenv from "dotenv";

import { DataSource, DataSourceOptions } from "typeorm";

import { OrderEntity } from "../order/entities/order.entity";
import { ProductEntity } from "../product/entities/product.entity";
import { CustomerEntity } from "../customer/entities/customer.entity";
import { OrderProductEntity } from "../order/entities/orderProduct.entity";

dotenv.config();

const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [CustomerEntity, ProductEntity, OrderEntity, OrderProductEntity],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(AppDataSourceOptions);
