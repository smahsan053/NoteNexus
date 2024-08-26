import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const payloadData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payloadData;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
