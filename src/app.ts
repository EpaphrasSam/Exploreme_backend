import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import index from "./routes/index";
import { TokenVerification } from "./middlewares/authMiddleware";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(loggerMiddleware);

app.post("/", index);

app.use(TokenVerification);

app.use("/auth", auth);

app.use(notFoundMiddleware, errorMiddleware);

export default app;
