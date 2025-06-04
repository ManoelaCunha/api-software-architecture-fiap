import { CPF } from "../value-objects/cpf";
import { Email } from "../value-objects/email";

export class Customer {
  id?: number;
  private _name: string;
  private _email: string;
  private _cpf: string;

  constructor(id: number, name: string, email: string, cpf: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }

  set name(value: string) {
    this._name = value.trim();
  }
  get name(): string {
    return this._name;
  }

  set email(value: string) {
    this._email = Email.validation(value).isValid;
  }
  get email(): string {
    return this._email;
  }

  set cpf(value: string) {
    this._cpf = CPF.validation(value).isValid;
  }
  get cpf(): string {
    return this._cpf;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      cpf: this.cpf,
    };
  }
}
