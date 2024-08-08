"use strict";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import expres, { json, urlencoded } from "express";
import morgan from "morgan";
import db from "./lib/db.js";
import {
  DefaultErrorHandler,
  NotFoundHandler,
} from "./middlewares/commonHandler.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
const app = expres();
config();

app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(json());
app.use(urlencoded({ extended: false }));

db.connect();

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(NotFoundHandler);
app.use(DefaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
