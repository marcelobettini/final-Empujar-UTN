import { hash, compare } from "bcrypt";
const saltRounds = 10;
export const encryptPassword = async password => {
  return await hash(password, saltRounds);
};
export const checkPassword = async (password, encryptedPassword) => {
  return await compare(password, encryptedPassword);
};
