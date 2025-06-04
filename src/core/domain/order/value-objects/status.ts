import { DomainError } from "../../_errors/domain.error";
import { OrderStatus } from "../entities/orderStatus";

export class Status {
  private readonly status: OrderStatus;

  private constructor(status: OrderStatus) {
    this.status = status;
  }

  static validation(status: OrderStatus): Status {
    let valueFormatted = status;

    if (status === OrderStatus.RECEBIDO) {
      valueFormatted = OrderStatus.EM_PREPARACAO;
    }

    if (status === OrderStatus.EM_PREPARACAO) {
      valueFormatted = OrderStatus.PRONTO;
    }

    if (status === OrderStatus.PRONTO) {
      valueFormatted = OrderStatus.FINALIZADO;
    }

    if (status === OrderStatus.FINALIZADO) {
      throw new DomainError("Pedido já foi finalizado!", 422);
    }

    if (status === OrderStatus.CANCELADO) {
      throw new DomainError(
        "Pedido foi cancelado e não pode ser atualizado!",
        422
      );
    }

    if (status === OrderStatus.PENDENTE) {
      throw new DomainError(
        "Pedido pendente de pagamento não pode ser atualizado!",
        422
      );
    }

    return new Status(valueFormatted);
  }

  get isValid(): OrderStatus {
    return this.status;
  }
}
