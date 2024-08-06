import { config } from "dotenv";
import mongoose from "mongoose";
config();
const db = {};

mongoose.connection.on("connecting", () =>
  console.log("mongoose connecting with mongodb")
);
mongoose.connection.on("connected", () =>
  console.log("mongoose connected with mongodb")
);
mongoose.connection.on("open", () => console.log("open mongodb"));

mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
mongoose.connection.on("close", () => console.log("close"));

db.connect = async () => {
  try {
    const dbconnection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Mongodb Connected ${dbconnection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default db;
