import { ProductDTO } from "../../product/dtos/product.dto";

export interface OrderProductDTO {
  id?: number;
  product: ProductDTO;
  quantity: number;
}
