import express from "express";
import AuthController from "../controllers/AuthController";

const { signIn, signUp } = AuthController;
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
