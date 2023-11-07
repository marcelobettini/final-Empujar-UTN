import mysql from "mysql2/promise";
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  port: 3306,
  database: "movies",
};
// una conexión se establece cada vez que se necesita conectar con la DB
export const connection = await mysql.createConnection(dbConfig);
connection.connect(err => {
  err ? console.error(err) : console.log("Connected to database");
});

// const pool = mysql.createPool(dbConfig);
// // now get a Promise wrapped instance of that pool
// export const promisePool = pool.promise();
