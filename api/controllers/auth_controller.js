import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import createAccessToken from "../libs/jws.js";

export const register = async (req, res) => {
  const { name, email, pass, age, employment, phone } = req.body;
  try {
    const password = await bcrypt.hash(pass, 10);

    const newUser = User({
      name,
      email,
      pass: password,
      age,
      employment,
      phone,
    });

    const userData = await newUser.save();
    const token = await createAccessToken({ id: userData._id });
    res.cookie("token", token);
    res.json({
      status: "success",
      message: "User created successfully",
      id: userData._id,
      email: userData.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(pass, userFound.pass);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      status: "success",
      message: "login successfully",
      id: userFound._id,
      email: userFound.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successfully" });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.json({
    id: userFound._id,
    email: userFound.email,
  });
};
