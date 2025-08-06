import { Router, Application } from "express";
import { ProductController } from "./product.controller";
import { ProductRepository } from "../../infrastructure/product/repositories/product.repository";
import { ProductService } from "../../application/product/services/product.service";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();

const productRouter = (app: Application) => {
  router.post("/product", (req, res, next) =>
    productController.createProduct(req, res, next)
  );
  router.put("/product/:id", (req, res, next) =>
    productController.updateProduct(req, res, next)
  );
  router.delete("/product/:id", (req, res, next) =>
    productController.deleteProduct(req, res, next)
  );
  router.get("/product/:id", (req, res, next) =>
    productController.getProductById(req, res, next)
  );
  router.get("/product/category/:category", (req, res, next) =>
    productController.getProductsByCategory(req, res, next)
  );

  app.use(router);
};

export { productRouter };
