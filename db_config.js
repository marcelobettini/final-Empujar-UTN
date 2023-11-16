import mysql from "mysql2/promise";
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  port: 3306,
  database: "movies",
};
// una conexión se establece cada vez que se necesita conectar con la DB
export const connection = mysql.createPool(dbConfig);
