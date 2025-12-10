import { Request, Response } from "express";
import sendRes from "../../helper/sendRes";
import { productService } from "./product.service";

const addProduct = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await productService.addProduct(body);

    sendRes(res, 201, {
      success: true,
      message: "product added successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendRes(res, 500, { success: false, message: error.message });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProducts();

    sendRes(res, 200, {
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendRes(res, 500, { success: false, message: error.message });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const result = await productService.getSingleProduct(productId as string);

    sendRes(res, 200, {
      success: true,
      message: "Product retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendRes(res, 500, { success: false, message: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const body = req.body;

  try {
    const result = await productService.updateProduct(
      productId as string,
      body
    );

    const statusCode = result.success ? 201 : 400;
    sendRes(res, statusCode, result);
  } catch (error: any) {
    sendRes(res, 500, { success: true, message: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const result = await productService.deleteProduct(productId as string);

    if (!result.rowCount) {
      sendRes(res, 400, {
        success: true,
        message: `No product with id:${productId}`,
      });
    }

    sendRes(res, 201, { success: true, message: "Product Deleted" });
  } catch (error: any) {
    sendRes(res, 500, { success: false, message: error.message });
  }
};

export const productController = {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
