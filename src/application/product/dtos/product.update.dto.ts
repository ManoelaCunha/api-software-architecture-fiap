import { ProductCategory } from "../../../domain/product/entities/productCategory";

export interface UpdateProductDTO {
  id: number;
  name?: string;
  price?: number;
  category?: ProductCategory;
  description?: string;
  imageUrl?: string;
}
