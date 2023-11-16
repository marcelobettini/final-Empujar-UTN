import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;
//crear el token
export const tokenSign = async (user, time) => {
  const sign = jwt.sign(user, SECRET, { expiresIn: time });
  return sign;
};

//verificar que el token haya sido firmado por el backend
export const tokenVerify = async token => {
  return jwt.verify(token, SECRET);
};
