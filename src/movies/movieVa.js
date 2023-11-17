import { z } from "zod";
const currentYear = new Date().getFullYear();

/* movie entity->
optional: validate id: UUID for get by id, delete, patch methods
validate users

*/

const movieSchema = z.object({
  title: z.string({ required_error: "Field is required" }),
  year: z.number().int().min(1895).max(currentYear),
  director: z.string({ required_error: "Field is required" }),
  duration: z.number().int().positive().min(60),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z
    .enum([
      "Action",
      "Adventure",
      "Biography",
      "Comedy",
      "Crime",
      "Drama",
      "Fantasy",
      "Film-Noir",
      "Horror",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Thriller",
    ])
    .array(),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}
