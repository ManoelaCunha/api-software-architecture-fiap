import { DomainError } from "../../_errors/domain.error";

export class CPF {
  private readonly cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static validation(cpf: string): CPF {
    const valueFormatted = cpf.replace(/\D/g, "").trim();

    if (valueFormatted.length < 11) {
      throw new DomainError("CPF deve ter 11 dígitos!", 422);
    }

    const cpfRegex = /^(\d)\1{10}$/;
    if (cpfRegex.test(valueFormatted)) {
      throw new DomainError("CPF não pode ter dígitos iguais!", 422);
    }

    return new CPF(valueFormatted);
  }

  get isValid(): string {
    return this.cpf;
  }
}
