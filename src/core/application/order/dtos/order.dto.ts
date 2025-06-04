import { OrderStatus } from "../../../domain/order/entities/orderStatus";
import { CustomerDTO } from "../../customer/dtos/customer.dto";
import { OrderProductDTO } from "./orderProduct.dto";

export interface OrderDTO {
  id?: number;
  products: OrderProductDTO[];
  customer?: CustomerDTO;
  status?: OrderStatus;
  createdDate?: Date;
  updatedDate?: Date;
  payment?: boolean;
  pix?: string;
}
