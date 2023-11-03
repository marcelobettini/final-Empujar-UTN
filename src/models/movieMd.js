import { connection } from "../../db_config.js";

export class MovieMd {
  static async getAll(director) {
    if (!director) {
      const [movies, _info] = await connection.query(`
      SELECT title, year, director, rate FROM movies
      `);
      return movies.length ? movies : null;
    }

    const [movies, _info] = await connection.query(
      `SELECT title, year, director, rate FROM movies WHERE director LIKE ('%'?'%')`,
      [director]
    );
    return movies.length ? movies : null;
  }
}
