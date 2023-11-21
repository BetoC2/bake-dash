import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequiered = (req, res, next) => {
  const body = req.body;
  if (!body.id) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  next();
};

export const adminAuth = (req, res, next) => {
  const id = req.body.id;
  if (id !== TOKEN_ADMIN) {
    return res.status(401).json({ message: "You are not admin" });
  }
  next();
};
