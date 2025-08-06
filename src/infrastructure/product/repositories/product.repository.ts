import { Repository, DeleteResult } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { ProductEntity } from "../entities/product.entity";

import { Product } from "../../../domain/product/entities/product";
import { ProductCategory } from "../../../domain/product/entities/productCategory";
import { ProductFactory } from "../../../application/product/factories/product.factory";
import { IProductRepository } from "../../../application/product/interfaces/product.interface";

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<ProductEntity>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(ProductEntity);
  }

  async createProduct(product: Product): Promise<Product> {
    const productEntity = this.ormRepository.create({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
    });

    const savedProduct = await this.ormRepository.save(productEntity);

    return ProductFactory.create(savedProduct);
  }

  async updateProduct(product: Product): Promise<Product> {
    await this.ormRepository.update(product.id as number, {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    return product;
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    return await this.ormRepository.delete(productId);
  }

  async findByCategory(category: ProductCategory): Promise<Product[]> {
    const productEntity = await this.ormRepository.findBy({ category });
    return productEntity.map((product) => {
      return ProductFactory.create(product);
    });
  }

  async findById(productId: number): Promise<Product | null> {
    const productEntity = await this.ormRepository.findOneBy({ id: productId });
    if (!productEntity) return null;
    return ProductFactory.create(productEntity);
  }
}
