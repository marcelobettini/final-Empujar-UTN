import { MovieMd } from "./movieMd.js";
import { isValidUUID } from "../utils/isValidUUID.js";
import { validateMovie, validateId } from "./movieVa.js";
import { deleteImage } from "../utils/deleteImage.js";
import path from "node:path";
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
    // const isValidID = isValidUUID(id);
    const isValidID = validateId(id);
    console.log(isValidID);

    if (!isValidID.success)
      return res.status(422).json({ message: "Not valid ID" });

    const movie = await MovieMd.getById(id);
    if (!movie.length)
      return res.status(404).json({ message: "Movie Not Found" });
    res.status(200).json(movie);
  }

  //trae por director
  static async getByQuery(req, res) {
    if (!req.query.director)
      return res
        .status(400)
        .json({ message: "must be similar to ?director=spielgerg" });
  }
  //borrar
  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
    const [row] = await MovieMd.getById(id);
    const fileName = row.poster.split("http://localhost:3000/").pop();
    const result = await MovieMd.deleteOne(id);
    if (!result) return res.status(404).json({ message: "Movie Not Found" });
    await deleteImage(path.resolve(`./public/${fileName}`));
    res.sendStatus(204);
  }
  //crear una
  static async addOne(req, res) {
    const { title, year, director, duration, genre, rate } = req.body;
    let sanitisedGenre = [];
    if (typeof genre === "string") {
      sanitisedGenre.push(genre);
    } else {
      sanitisedGenre = genre;
    }
    const poster = `${URL}/${req.file.filename}`;
    const validationResult = validateMovie({
      title,
      year: Number(year),
      director,
      duration: Number(duration),
      genre: sanitisedGenre,
      rate: Number(rate),
      poster,
    });
    if (!validationResult.success) {
      console.log(validationResult.error);
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
