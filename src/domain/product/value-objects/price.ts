import { DomainError } from "../../_errors/domain.error";

export class Price {
  private readonly price: number;

  private constructor(price: number) {
    this.price = price;
  }

  static validation(price: number): Price {
    if (price <= 0) {
      throw new DomainError("O preço do produto deve ser maior que zero!", 422);
    }

    if (!Number.isInteger(price * 100)) {
      throw new DomainError(
        "O preço não pode ter mais de duas casas decimais!",
        422
      );
    }

    return new Price(price);
  }

  get isValid(): number {
    return this.price;
  }
}
