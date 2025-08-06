import { ProductCategory } from "../../../domain/product/entities/productCategory";

export interface ProductDTO {
  id?: number;
  name: string;
  price: number;
  category: ProductCategory;
  description?: string;
  imageUrl?: string;
}
