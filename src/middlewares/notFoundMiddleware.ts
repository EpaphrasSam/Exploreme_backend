import { Request, Response, NextFunction } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: any = new Error("Not Found");
  error["status"] = 404;
  next(error);
};
