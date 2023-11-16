import { z } from "zod";
/* movie entity->
id: UUID
title: string
year: year (number)
director: string
poster: string(url)
rate: number btw 0 10 (both inclusive)
genre: arr of gen (enum)
*/

const movieSchema = z.object({
  title: z.string({ required_error: "Field is required" }),
  year: z.number().int().min(1895).max(), //tarea: Cómo resolver el dilema del año actual??? y el año entrante? 😱🤯
  director: z.string({ required_error: "Field is required" }),
});
