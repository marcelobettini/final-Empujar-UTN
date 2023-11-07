import { MovieMd } from "../models/movieMd.js";
import { isValidUUID } from "../../utils/isValidUUID.js";
export class MovieCt {
  static async getAll(req, res) {
    const { director } = req.query;
    const movies = await MovieMd.getAll(director);
    movies
      ? res.status(200).json(movies)
      : res.status(404).json({ message: "Movie Not Found" });
  }

  static async getById(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const movie = await MovieMd.getById(id);
    if (!movie.length)
      return res.status(404).json({ message: "Movie Not Found" });
    res.status(200).json(movie);
  }

  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
    const result = await MovieMd.deleteOne(id);
    if (!result) return res.status(404).json({ message: "Movie Not Found" });
    res.status(204);
  }
}
