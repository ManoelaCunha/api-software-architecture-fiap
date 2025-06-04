import { Product } from "../../../domain/product/entities/product";
import { ProductDTO } from "../dtos/product.dto";

export class ProductFactory {
  static create(product: ProductDTO): Product {
    const { id, name, price, category, description, imageUrl } = product;
    return new Product(id!, name, price, category, description, imageUrl);
  }
}
