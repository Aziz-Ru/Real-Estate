"use strict";
import cookieParser from "cookie-parser";
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

const app = expres();
config();

app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(json());
app.use(urlencoded({ extended: false }));

db.connect();

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.get("/api", (req, res) => {
  const maxAge = 1000 * 3600 * 24 * 7;
  res
    .cookie("test", "fkjfdsj", {
      expires: new Date(Date.now() + maxAge),
      httpOnly: true,
      
    })
    .json({ msg: "Accepted" });
  res.clearCookie("test").send("Cookie clear");
});

app.use(NotFoundHandler);
app.use(DefaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
