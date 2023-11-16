import { tokenVerify } from "../src/utils/handleJWT.js";
export const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  const isValidToken = await tokenVerify(token);
  isValidToken ? next() : res.status(401).json({ message: "Invalid token" });
};
