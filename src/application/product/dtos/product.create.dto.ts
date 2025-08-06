import { ProductCategory } from "../../../domain/product/entities/productCategory";

export interface CreateProductDTO {
  name: string;
  price: number;
  category: ProductCategory;
  description?: string;
  imageUrl?: string;
}
