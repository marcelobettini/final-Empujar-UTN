import { MovieMd } from "./movieMd.js";
import { isValidUUID } from "../utils/isValidUUID.js";
import { validateMovie } from "./movieVa.js";
export class MovieCt {
  static async getAll(req, res) {
    // res.header("Access-Control-Allow-Origin", "*");
    const { director } = req.query;
    const movies = await MovieMd.getAll(director);
    //resolver que la respuesta sea una película con todos sus géneros en vez de repetir la
    // película por cada género al que la película pertenece
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

  static async addOne(req, res) {
    const validationResult = validateMovie(req.body);
    if (!validationResult.success) {
      return res.status(422).json(validationResult.error);
    }
    try {
      await MovieMd.addOne(req.body);
      res.status(201).json({ message: "Movie created" });
    } catch (error) {
      error.message.startsWith("Incorrect")
        ? res.status(400).json({ message: error.message })
        : res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
    const [isMovie, _info] = await MovieMd.getById(id);

    if (!isMovie) return res.status(404).json({ message: "Movie Not Found" });
    const updatedMovie = await MovieMd.updateOne(id, req.body);
    updatedMovie
      ? res.status(200).json({ message: "Movie updated" })
      : res.status(500).json({ message: "Internal Server Error" });
  }
}
