import { NextFunction, Request, Response } from "express";
import { ProductCategory } from "../../domain/product/entities/productCategory";
import { ProductService } from "../../application/product/services/product.service";

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    try {
      const dto = { ...req.body, id };
      const product = await this.productService.updateProduct(dto);
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    try {
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.params.category as ProductCategory;
      const products = await this.productService.getProductByCategory(category);
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const products = await this.productService.getProductById(id);
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }
}
