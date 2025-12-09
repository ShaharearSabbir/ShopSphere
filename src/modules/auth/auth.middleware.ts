import { NextFunction, Request, Response } from "express";
import sendRes from "../../helper/sendRes";

const validateSignInputs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return sendRes(res, 400, {
      success: false,
      message: "Please provide a valid email and password",
    });
  }

  if (password.length < 8) {
    return sendRes(res, 400, {
      success: false,
      message: "Password is too weak",
    });
  }

  next();
};

export const authMiddleware = {
  validateSignInputs,
};
