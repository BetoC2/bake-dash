export const authRequiered = (req, res, next) => {
  const body = req.body;
  if (!body.id) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  next();
};

// Para este middleware, se debe enviar un header con el nombre "auth" y el valor "Admin"
export const adminAuth = (req, res, next) => {
  const authHeader = req.headers["auth"];
  console.log(typeof req.headers);

  if (!authHeader || authHeader !== "Admin") {
    return res
      .status(401)
      .json({ message: "Unauthorized. You are not an admin." });
  }

  next();
};
