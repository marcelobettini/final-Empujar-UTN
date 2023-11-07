import { Router } from "express";
export const router = Router();

import { MovieCt } from "../controllers/moviesCt.js";
router.get("/", MovieCt.getAll);

router.get("/:id", MovieCt.getById);

router.delete("/:id", MovieCt.deleteOne);

router.post("/", (req, res) => {
  console.log(req.body);
});
