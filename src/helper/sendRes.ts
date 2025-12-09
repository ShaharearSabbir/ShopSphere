import { Response } from "express";

const sendRes = (
  res: Response,
  statusCode: number,
  data: Record<string, unknown>
) => {
  res.status(statusCode).json(data);
};

export default sendRes;
