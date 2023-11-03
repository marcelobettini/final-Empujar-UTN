import mysql from "mysql2/promise";
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  port: 3306,
  database: "movies",
};

export const connection = await mysql.createConnection(dbConfig);
connection.connect(err => {
  err ? console.error(err) : console.log("Connected to database");
});
