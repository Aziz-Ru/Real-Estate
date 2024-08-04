import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    });

    res.status(201).json({ msg: "New user created", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(501).json({ errors: { msg: error.message } });
  }
};

export const login = async (req, res) => {};
export const logout = async (req, res) => {};
