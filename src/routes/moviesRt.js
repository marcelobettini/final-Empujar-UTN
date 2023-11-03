import { Router } from "express";
export const router = Router();

import { MovieCt } from "../controllers/moviesCt.js";
router.get("/", MovieCt.getAll);

router.get("/:id", (req, res) => {
  res.json({ message: "find by id" });
});

router.post("/", (req, res) => {
  console.log(req.body);
});
