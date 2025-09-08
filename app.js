import express from "express";
import { client } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { authRouter } from "./routes/authRouter.js";
import stdRouter from "./routes/stdRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT || 3100;

await client.connect()
    .then(() => console.log("Database is connected!"))
    .catch((err) => console.error("Database connection error:", err.stack));


app.use(cors({
  origin: "http://127.0.0.1:50378",
  credentials: true
}));
app.use(express.static("../client"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/", stdRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});