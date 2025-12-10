import { Request, Response } from "express";
import { authService } from "./auth.service";
import sendRes from "../../helper/sendRes";
import config from "../../config";

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.signUp(email, password);

    sendRes(res, 201, result);
  } catch (error: any) {
    sendRes(res, 500, { success: true, message: error.message });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.signIn(email, password);

    const statusCode = result.success ? 200 : 401;

    if (result.success && result.token) {
      const cookieOption = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: config.ENV === "production",
        sameSite: "strict" as const,
      };

      res.cookie("accessToken", result.token, cookieOption);
    }

    delete result.token;

    sendRes(res, statusCode, result);
  } catch (error: any) {
    sendRes(res, 500, { success: false, message: error.message });
  }
};

export const authController = {
  signUp,
  signIn,
};
