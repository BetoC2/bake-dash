import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, pass, employment, phone } = req.body;
  try {
    const password = await bcrypt.hash(pass, 10);

    const newUser = User({
      name,
      email,
      pass: password,
      employment,
      phone,
    });

    const userData = await newUser.save();
    res.json({
      status: "success",
      message: "User created successfully",
      id: userData._id,
      username: userData.username,
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
    res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      employment: userFound.employment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    employment: userFound.employment,
    phone: userFound.phone,
  });
};
