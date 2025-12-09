import express from "express";
import initDB from "./config/db";
import { authRoute } from "./modules/auth/auth.routes";

const app = express();

// Data Parser
app.use(express.json());

// Initiate Database
initDB();

// Auth
app.use("/auth", authRoute);

export default app;
