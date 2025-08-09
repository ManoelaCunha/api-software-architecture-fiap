import { DeleteResult } from "typeorm";
import { Product } from "../../../domain/product/entities/product";
import { ProductCategory } from "../../../domain/product/entities/productCategory";

export interface IProductRepository {
  createProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(productId: number): Promise<DeleteResult>;
  findByCategory(category: ProductCategory): Promise<Product[]>;
  findById(productId: number): Promise<Product | null>;
}
