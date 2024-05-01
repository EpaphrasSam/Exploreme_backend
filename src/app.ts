import * as dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import index from "./routes/index";
import { TokenVerification } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("combined"));

app.post("/", index);

app.use(TokenVerification);

app.use("/auth", auth);

app.use(notFoundMiddleware, errorMiddleware);

export default app;
