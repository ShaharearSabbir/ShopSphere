import { Router } from "express";
import { productController } from "./product.controller";
import { productMiddleware } from "./product.middleware";

const route = Router();

route.post(
  "/",
  productMiddleware.validateProductInput,
  productController.addProduct
);

route.get("/", productController.getProducts);

route.get("/:productId", productController.getSingleProduct);

route.put("/:productId", productController.updateProduct);

route.delete("/:productId", productController.deleteProduct);

export const productRoute = route;
