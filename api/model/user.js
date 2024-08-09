"use strict";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email ALready Exist"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username must be required"],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  posts: [{ type: mongoose.Types.ObjectId,ref:"Post" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
