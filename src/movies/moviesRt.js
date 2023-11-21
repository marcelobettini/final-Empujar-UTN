import { Router } from "express";
export const router = Router();
import { isAuth } from "../../middlewares/session.js";

import { MovieCt } from "./moviesCt.js";
import { uploadFile } from "../utils/handleStorage.js";
router.get("/", MovieCt.getAll);

router.get("/:id", MovieCt.getById);

//insert auth_middleware between request and controller
router.delete("/:id", isAuth, MovieCt.deleteOne);

router.post("/", isAuth, uploadFile.single("posterName"), MovieCt.addOne);

router.patch("/:id", isAuth, MovieCt.updateOne);
