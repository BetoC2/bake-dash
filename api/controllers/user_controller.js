import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findByIdAndDelete(id);
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully",
      id: userFound._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, pass, age, employment, phone } = req.body;
  try {
    const password = await bcrypt.hash(pass, 10);
    const userFound = await User.findByIdAndUpdate(
      id,
      {
        name,
        username,
        email,
        pass: password,
        age,
        employment,
        phone,
      },
      { new: true }
    );
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      status: "success",
      message: "User updated successfully",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      userFound,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsersByName = async (req, res) => {
  const { name } = req.params;
  try {
    const usersFound = await User.find({ name: { $regex: name } });
    console.log(usersFound);
    if (!usersFound) {
      return res.json([]);
    }
    res.json({
      usersFound,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
