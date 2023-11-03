import { MovieMd } from "../models/movieMd.js";
export class MovieCt {
  static async getAll(req, res) {
    const { director } = req.query;
    const movies = await MovieMd.getAll(director);
    movies
      ? res.status(200).json(movies)
      : res.status(404).json({ message: "Movie Not Found" });
  }
}
