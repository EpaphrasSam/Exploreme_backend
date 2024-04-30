// Error handling middleware
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If no specific error, assume 404 Not Found
  if (!err) {
    err = new Error("Not Found");
    err.status = 404;
  }

  console.error(err);

  // Check if headers have already been sent to the client
  if (res.headersSent) {
    return next(err);
  }

  // Set HTTP status code
  const statusCode = err.status || 500;
  res.status(statusCode);

  // Send error information back to the client
  res.json({
    error: {
      message: err.message || "An unexpected error occurred.",
      status: statusCode,
    },
  });
};
