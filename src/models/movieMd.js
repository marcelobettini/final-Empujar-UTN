import { connection } from "../../db_config.js";

export class MovieMd {
  static async getAll(director) {
    if (!director) {
      const [movies, _info] = await connection.query(`
      SELECT title, year, director, rate, BIN_TO_UUID(id) as id FROM movies
      `);
      return movies.length ? movies : null;
    }

    const [movies, _info] = await connection.query(
      `SELECT title, year, director, rate, id FROM movies WHERE director = ?`,
      [director]
    );
    return movies.length ? movies : null;
  }
  /*
   * @param id number
   * @return field list -> title, year, director, rate, id
   */
  static async getById(id) {
    const [movie, _info] = await connection.query(
      `     
  SELECT title, year, director, rate, BIN_TO_UUID(id) as id FROM movies WHERE id = UUID_TO_BIN(?)`,
      [id]
    );
    return movie;
  }

  static async deleteOne(id) {
    const [info] = await connection.query(
      `DELETE FROM movies WHERE movies.id = UUID_TO_BIN(?)`,
      [id]
    );
    return info.affectedRows;
  }
}
