import { DomainError } from "../../_errors/domain.error";

export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static validation(email: string): Email {
    const valueFormatted = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valueFormatted)) {
      throw new DomainError("Formato de email inválido!", 422);
    }

    return new Email(valueFormatted);
  }

  get isValid(): string {
    return this.email;
  }
}
