import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export const generateToken = (userId: string) => {
  // Sign the user ID with the JWT secret and set an expiration time of 24 hours.
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "24h",
  });

  // Return the generated token.
  return token;
};

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
