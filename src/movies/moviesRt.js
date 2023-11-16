import { Router } from "express";
export const router = Router();

import { MovieCt } from "./moviesCt.js";
router.get("/", MovieCt.getAll);

router.get("/:id", MovieCt.getById);

router.delete("/:id", MovieCt.deleteOne);

router.post("/", MovieCt.addOne);

router.patch("/:id", MovieCt.updateOne);
