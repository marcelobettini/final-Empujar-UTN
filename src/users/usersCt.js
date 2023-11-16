import { UserMd } from "./userMd.js";
import { encryptPassword, checkPassword } from "../utils/handlePassword.js";
import { tokenSign, tokenVerify } from "../utils/handleJWT.js";

export class UserCt {
  static async getAll(req, res) {
    const users = await UserMd.getAll();
    users
      ? res.status(200).json(users)
      : res.status(404).json({ message: "Users Not Found" });
  }
  static async register(req, res) {
    const { fullName, email, pass } = req.body;
    const securedPass = await encryptPassword(pass);
    const newUser = {
      fullName,
      email,
      pass: securedPass,
    };
    const userCreated = await UserMd.register(newUser);
    userCreated
      ? res.status(201).json({ message: "User created" })
      : res.status(500).json({ message: "Internal Server Error" });
  }
  static async login(req, res) {
    const { email, pass } = req.body;
    const isUser = await UserMd.getUserByEmail(email);
    if (!isUser)
      return res.status(401).json({ message: "Incorrect email or password" });
    const isValidPassword = await checkPassword(pass, isUser[0].pass);
    if (!isValidPassword)
      return res.status(401).json({ message: "Incorrect email or password" });
    const tokenPayload = {
      fullName: isUser[0].fullName,
      email: isUser[0].email,
    };
    const jwt = await tokenSign(tokenPayload, 1000 * 60 * 60 * 24 * 365);

    res.status(200).json({ message: "Login successful", token: jwt });
  }
}

//   static async deleteOne(req, res) {
//     const { id } = req.params;
//     const isValidID = isValidUUID(id);
//     if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
//     const result = await MovieMd.deleteOne(id);
//     if (!result) return res.status(404).json({ message: "Movie Not Found" });
//     res.status(204);
//   }

//   static async updateOne(req, res) {
//     const { id } = req.params;
//     const isValidID = isValidUUID(id);
//     if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
//     const [isMovie, _info] = await MovieMd.getById(id);

//     if (!isMovie) return res.status(404).json({ message: "Movie Not Found" });
//     const updatedMovie = await MovieMd.updateOne(id, req.body);
//     updatedMovie
//       ? res.status(200).json({ message: "Movie updated" })
//       : res.status(500).json({ message: "Internal Server Error" });
//   }
// }
