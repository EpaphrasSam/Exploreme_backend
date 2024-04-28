import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/tokenUtils";

export const TokenVerification = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // Extract the token from the request headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    if (req.originalUrl.startsWith("/auth")) {
      return next();
    }
    return res
      .status(401)
      .json({ message: "Unauthorized access (missing token)" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and extract the user ID
    const decoded = verifyToken(token);
    req.body.userId = (decoded as JwtPayload).userId;

    // Check if the requested URL starts with /api/auth/
    if (req.originalUrl.startsWith("/auth")) {
      return res
        .status(403)
        .json({ message: "Access denied for authenticated users" });
    }

    // Proceed to the next middleware
    next();
  } catch (error: any) {
    // Handle token verification errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Error verifying token" });
    }
  }
};
