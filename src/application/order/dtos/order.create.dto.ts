export interface CreateOrderDTO {
  cpf?: string;
  products: { productId: number; quantity: number }[];
}
