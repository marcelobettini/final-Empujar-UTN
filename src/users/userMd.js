import { connection } from "../../db_config.js";

export class UserMd {
  static async getAll() {
    const [users, _info] = await connection.query(`SELECT * FROM users`);
    return users.length ? users : null;
  }
  static async register(user) {
    const { fullName, email, pass } = user;

    const result = await connection.query(
      `
    INSERT INTO users (fullName, email, pass)
    VALUES (?,?,?)`,
      [fullName, email, pass]
    );

    return result ? result : null;
  }
  static async getUserByEmail(email) {
    const [user, _info] = await connection.query(
      `
    SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    return user.length ? user : null;
  }

  // const [movies, _info] = await connection.query(
  //   `SELECT m.title, g.name as genre, m.year, m.director, BIN_TO_UUID(m.id) AS id FROM movies m
  //   JOIN movie_genres mg ON mg.movie_id = m.id
  //   JOIN genres g ON mg.genre_id = g.id
  //   WHERE director = ?`,
  //   [director]
  // );
  // return movies.length ? movies : null;
}
/*
 * @param id number
 * @return field list -> title, year, director, rate, id
 */
// static async getById(id) {
//   const [movie, _info] = await connection.query(
//     `
// SELECT title, year, director, rate, BIN_TO_UUID(id) as id FROM movies WHERE id = UUID_TO_BIN(?)`,
//     [id]
//   );

/*complete with list of genre per movie:
    SELECT m.title, g.name, m.year, m.director, BIN_TO_UUID(m.id) AS id FROM movies m
JOIN movie_genres mg ON mg.movie_id = m.id
JOIN genres g ON mg.genre_id = g.id
    */
//   return movie;
// }

//   static async deleteOne(id) {
//     const [info] = await connection.query(
//       `DELETE FROM movies WHERE movies.id = UUID_TO_BIN(?)`,
//       [id]
//     );
//     return info.affectedRows;
//   }

//   static async updateOne(id, partialMovie) {
//     let queryString = "";
//     for (const key in partialMovie) {
//       queryString += `${key} = '${partialMovie[key]}', `;
//     }
//     queryString = queryString.slice(0, -2);
//     const [result, _info] = await connection.query(
//       `UPDATE movies SET ${queryString} WHERE movies.id = UUID_TO_BIN(?)`,
//       [id]
//     );
//     return result.affectedRows;
//   }
// }
