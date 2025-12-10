import { NextFunction, Request, Response } from "express";
import sendRes from "../helper/sendRes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  const roleSet = new Set(roles);

  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendRes(res, 401, {
        success: false,
        message: "unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return sendRes(res, 401, {
        success: false,
        message: "unauthorized access",
      });
    }

    const secret = config.JWT_SECRET;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (roleSet.size !== 0 && !roleSet.has(decoded.role)) {
      return sendRes(res, 401, {
        success: false,
        message: "unauthorized access",
      });
    }

    req.user = decoded;
    next();
  };
};

export default auth;
