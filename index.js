import cors from "cors";
import express from "express";
import { router as moviesRt } from "./src/movies/moviesRt.js";
import { router as usersRt } from "./src/users/usersRt.js";
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(cors("*"));
app.disable("x-powered-by");
// app.options("/movies", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.end();
// });
app.use(express.json());
app.listen(PORT, err => {
  console.log(
    err
      ? `Ocurrió un error: ${err}`
      : `Servidor corre en http://localhost:${PORT}`
  );
});
app.use("/movies", moviesRt); //nombre del archivo enrutador que estamos definiendo);
//nombre del archivo enrutador que estamos definiendo);
app.use("/users", usersRt);
