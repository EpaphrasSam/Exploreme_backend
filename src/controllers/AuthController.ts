import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateToken } from "../util/tokenUtils";

const { signIn, signUp } = AuthService;

const AuthController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract user details from request body.
      const { username, email, password } = req.body;
      // Call the signUp function from AuthService to create a new user.
      await signUp(username, email, password);
      // Send success response.
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      // Log the error and send an error response.
      next(error);
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract user details from request body.
      const { username, password } = req.body;
      // Call the signIn function from AuthService to authenticate the user.
      const user = await signIn(username, password);
      // Generate a token for the authenticated user.
      const token = generateToken(user.id);
      // Send the token in the response.
      res.json({ token });
    } catch (error: any) {
      // Log the error and send an error response.
      next(error);
    }
  },
};

export default AuthController;
