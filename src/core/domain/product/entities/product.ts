import { Price } from "../value-objects/price";
import { ProductCategory } from "./productCategory";

export class Product {
  id?: number;
  private _name: string;
  private _price: number;
  private _category: ProductCategory;
  private _description?: string;
  private _imageUrl?: string;

  constructor(
    id: number,
    name: string,
    price: number,
    category: ProductCategory,
    description?: string,
    imageUrl?: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  set name(value: string) {
    this._name = value.trim();
  }
  get name(): string {
    return this._name;
  }

  set price(value: number) {
    this._price = Price.validation(value).isValid;
  }
  get price(): number {
    return this._price;
  }

  set category(value: ProductCategory) {
    this._category = value;
  }
  get category(): ProductCategory {
    return this._category;
  }

  set description(value: string | undefined) {
    this._description = value?.trim();
  }
  get description(): string | undefined {
    return this._description;
  }

  set imageUrl(value: string | undefined) {
    this._imageUrl = value?.trim();
  }
  get imageUrl(): string | undefined {
    return this._imageUrl;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      category: this.category,
      description: this.description,
      imageUrl: this.imageUrl,
    };
  }
}
