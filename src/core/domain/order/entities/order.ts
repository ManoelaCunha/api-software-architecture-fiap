import { DomainError } from "../../_errors/domain.error";
import { Customer } from "../../customer/entities/customer";
import { Status } from "../value-objects/status";
import { OrderProduct } from "./orderProduct";
import { OrderStatus } from "./orderStatus";

export class Order {
  id?: number;
  private _products: OrderProduct[];
  private _customer?: Customer;
  private _status: OrderStatus;
  private _totalOrder: number;
  private _createdDate: Date;
  private _updatedDate: Date;
  private _payment: boolean;
  private _pix?: string;

  constructor(
    id: number,
    products: OrderProduct[],
    customer?: Customer,
    status?: OrderStatus,
    createdDate?: Date,
    updatedDate?: Date,
    pix?: string,
    payment?: boolean
  ) {
    this.id = id;
    this.products = products;
    this.customer = customer;
    this.status = status ?? OrderStatus.PENDENTE;
    this.totalOrder = this.calculateTotalOrder();
    this.createdDate = createdDate ?? new Date();
    this.updatedDate = updatedDate ?? new Date();
    this.payment = payment ?? false;
    this.pix = pix;
  }

  set status(value: OrderStatus) {
    this._status = value;
  }
  get status(): OrderStatus {
    return this._status;
  }

  set totalOrder(value: number) {
    this._totalOrder = value;
  }
  get totalOrder(): number {
    return this._totalOrder;
  }

  set createdDate(date: Date) {
    this._createdDate = date;
  }
  get createdDate(): Date {
    return this._createdDate;
  }

  set updatedDate(date: Date) {
    this._updatedDate = date;
  }
  get updatedDate(): Date {
    return this._updatedDate;
  }

  set payment(value: boolean) {
    this._payment = value;
  }
  get payment(): boolean {
    return this._payment;
  }

  set pix(value: string | undefined) {
    this._pix = value;
  }
  get pix(): string | undefined {
    return this._pix;
  }

  set customer(value: Customer | undefined) {
    this._customer = value;
  }
  get customer(): Customer | undefined {
    return this._customer;
  }

  set products(value: OrderProduct[]) {
    if (value.length === 0) {
      throw new DomainError("O pedido deve conter pelo menos um produto!", 422);
    }
    this._products = value;
    this._totalOrder = this.calculateTotalOrder();
  }
  get products(): OrderProduct[] {
    return this._products;
  }

  private calculateTotalOrder(): number {
    return this._products.reduce(
      (sum, product) => sum + product.totalProduct,
      0
    );
  }

  updateOrderStatus(): void {
    this._status = Status.validation(this.status).isValid;
    this._updatedDate = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      customer: this.customer,
      products: this.products,
      payment: this.payment,
      totalOrder: this.totalOrder,
      status: this.status,
      pix: this.pix,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
