import bcrypt from "bcryptjs";
import User from "../model/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenId = req.userId;
    if (id !== tokenId) {
      return res.status(403).json({ errors: [{ msg: "Not Authorized" }] });
    }
    const user = await User.findById({ _id: id }).select(["-password", "-__v"]);
    console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: "Failed to get user" }] });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenId = req.userId;
  if (id !== tokenId) {
    return res.status(403).json({ errors: [{ msg: "Not Authorized" }] });
  }
  const { username, password, email, avatar } = req.body;
  try {
    const user = await User.findById(id);
    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }
    await user.save();

    return res.status(200).json({ id, username, email, avatar: avatar });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Failed to update user" }] });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenId = req.userId;
  if (id !== tokenId) {
    return res.status(403).json({ errors: [{ msg: "Not Authorized" }] });
  }

  try {
    await User.deleteOne({ _id: id });

    return res
      .clearCookie("__secure")
      .status(200)
      .json({ msg: "User delete successful" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Failed to delete user" }] });
  }
};
