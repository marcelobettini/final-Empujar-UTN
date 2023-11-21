import { MovieMd } from "./movieMd.js";
import { isValidUUID } from "../utils/isValidUUID.js";
import { validateMovie } from "./movieVa.js";
const URL = process.env.PUBLIC_URL;
export class MovieCt {
  //trae todos o trae por param director
  static async getAll(req, res) {
    // res.header("Access-Control-Allow-Origin", "*");
    const { director } = req.query;
    const movies = await MovieMd.getAll(director);
    movies
      ? res.status(200).json(movies)
      : res.status(404).json({ message: "Movie Not Found" });
  }
  //trae por id
  static async getById(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const movie = await MovieMd.getById(id);
    if (!movie.length)
      return res.status(404).json({ message: "Movie Not Found" });
    res.status(200).json(movie);
  }
  //borrar
  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
    const result = await MovieMd.deleteOne(id);
    if (!result) return res.status(404).json({ message: "Movie Not Found" });
    res.send(204);
  }
  //crear una
  static async addOne(req, res) {
    const { title, year, director, duration, genre, rate } = req.body;
    const poster = `${URL}/${req.file.filename}`;
    const validationResult = validateMovie({
      title,
      year: Number(year),
      director,
      duration: Number(duration),
      genre: genre.split(", "),
      rate: Number(rate),
      poster,
    });
    if (!validationResult.success) {
      return res.status(422).json(validationResult.error);
    }

    try {
      await MovieMd.addOne({
        ...validationResult.data,
        poster,
      });
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
