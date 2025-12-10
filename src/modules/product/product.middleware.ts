import { NextFunction, Request, Response } from "express";
import sendRes from "../../helper/sendRes";

const validateProductRequiredInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const validInput = [
    "name",
    "sku",
    "regular_price",
    "quantity",
    "description",
    "image",
    "category",
  ];

  for (const input of validInput) {
    if (body[input] === undefined) {
      return sendRes(res, 400, {
        success: false,
        message: `Missing required field: ${input}`,
      });
    }
  }

  if (body.regular_price <= 0 || body.quantity < 0) {
    return sendRes(res, 400, {
      success: false,
      message: `Price and quantity must be positive number`,
    });
  }

  next();
};

export const productMiddleware = {
  validateProductInput: validateProductRequiredInput,
};
