import { CreateProductDTO } from "../dtos/product.create.dto";
import { UpdateProductDTO } from "../dtos/product.update.dto";
import { ApplicationError } from "../../_errors/application.error";
import { DeleteResult } from "typeorm";

import { Product } from "../../../domain/product/entities/product";
import { ProductCategory } from "../../../domain/product/entities/productCategory";
import { ProductFactory } from "../factories/product.factory";
import { IProductRepository } from "../../../domain/product/interfaces/product.interface";


export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(product: CreateProductDTO): Promise<Product> {
    const newProduct = ProductFactory.create(product);

    return await this.productRepository.createProduct(newProduct);
  }

  async updateProduct(product: UpdateProductDTO): Promise<Product> {
    const { id, name, category, price, description, imageUrl } = product;

    const productEtity = await this.productRepository.findById(id);

    if (!productEtity) {
      throw new ApplicationError("Produto não existe!", 404);
    }

    if (name) productEtity.name = name;
    if (category) productEtity.category = category;
    if (price) productEtity.price = price;
    if (description) productEtity.description = description;
    if (imageUrl) productEtity.imageUrl = imageUrl;

    const updateProduct = ProductFactory.create(productEtity);

    return await this.productRepository.updateProduct(updateProduct);
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ApplicationError("Produto não existe!", 404);
    }

    return await this.productRepository.deleteProduct(productId);
  }

  async getProductByCategory(category: ProductCategory): Promise<Product[]> {
    const products = await this.productRepository.findByCategory(category);

    if (products.length === 0) {
      throw new ApplicationError(
        "Nenhum produto encontrado na categoria!",
        404
      );
    }

    return products;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ApplicationError("Produto não existe!", 404);
    }

    return product;
  }
}
