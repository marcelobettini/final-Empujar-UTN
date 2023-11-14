import { Router } from "express";
export const router = Router();
import { UserCt } from "./usersCt.js";

router.get("/", UserCt.getAll); //privado para un admin
router.post("/register", UserCt.register);
router.post("/login", UserCt.login);
// router.get("/:id", MovieCt.getById);

// router.delete("/:id", MovieCt.deleteOne);//esto solo el usuario

// router.post("/", MovieCt.addOne); //register

// router.patch("/:id", MovieCt.updateOne); //el usuario actualiza sus datos
