import { DomainError } from "../../_errors/domain.error";
import { Product } from "../../product/entities/product";

export class OrderProduct {
  id?: number;
  private _product: Product;
  private _quantity: number;
  private _totalProduct: number;

  constructor(id: number, product: Product, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.totalProduct = this.calculateTotalProduct();
  }

  set product(value: Product) {
    this._product = value;
  }
  get product(): Product {
    return this._product;
  }

  set quantity(value: number) {
    if (value <= 0) {
      throw new DomainError(
        "A quantidade do produto deve ser maior que zero!",
        422
      );
    }
    this._quantity = value;
    this._totalProduct = this.calculateTotalProduct();
  }
  get quantity(): number {
    return this._quantity;
  }

  set totalProduct(value: number) {
    this._totalProduct = value;
  }
  get totalProduct(): number {
    return this._totalProduct;
  }

  private calculateTotalProduct(): number {
    return this._product.price * this._quantity;
  }

  toJSON() {
    return {
      id: this.id,
      product: this.product,
      quantity: this.quantity,
      totalProduct: this.totalProduct,
    };
  }
}
