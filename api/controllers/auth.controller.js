"use strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existedUser = await User.findOne({ email: email });

    if (existedUser != null) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newuser = await User.create({
        email,
        username,
        password: hashPassword,
        avatar: req.body.avatar ? req.body.avatar : "",
      });

      return res
        .status(201)
        .json({ newuser, msg: "Account Created Successfully" });
    }
  } catch (error) {
    res.status(501).json({ errors: [{ msg: "Invalid Credentials" }] });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (user != null && isMatchPassword) {
      const age = 1000 * 3600 * 24 * 7;
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: "HS512",
          expiresIn: "7d",
        }
      );

      return res
        .cookie("__secure", token, {
          maxAge: age,
          httpOnly: true,
        })
        .status(200)
        .json({
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        });
    } else {
      // console.log("user comes");
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie("__secure")
    .status(200)
    .json({ msg: "Logout Successful" });
};
