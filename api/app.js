import { config } from "dotenv";
import expres, { json, urlencoded } from "express";
import morgan from "morgan";

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";

const app = expres();
config();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
