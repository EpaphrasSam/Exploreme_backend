import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import { TokenVerification } from "./middlewares/authMiddleware";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/", (req, res) => {
  res.send("Hello, World!");
});

// app.use(TokenVerification);

app.use("/auth", auth);

export default app;
