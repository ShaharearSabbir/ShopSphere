import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const route = Router();

route.post("/signup", authMiddleware.validateSignInputs, authController.signUp);

route.post("/signin", authMiddleware.validateSignInputs, authController.signIn);

export const authRoute = route;
