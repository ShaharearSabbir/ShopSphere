import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoute } from "./modules/auth/auth.routes";
import config from "./config";
import sendRes from "./helper/sendRes";
import { productRoute } from "./modules/product/product.routes";

const app = express();

// Data Parser
app.use(express.json());

// Initiate Database
initDB();

// Root directory
app.use("/", async (req: Request, res: Response) => {
  sendRes(res, 200, {
    success: true,
    message: `${config.NAME} server is running`,
  });
});

// Auth
app.use("/auth", authRoute);

// Product
app.use("/products", productRoute);

// Invalid directory
app.use(async (req: Request, res: Response) => {
  sendRes(res, 404, {
    success: false,
    message: `Invalid route`,
    path: req.path,
  });
});

export default app;
