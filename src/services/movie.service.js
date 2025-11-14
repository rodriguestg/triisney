import db from "../config/firebase.js";
import omdbApi from "../config/omdbApi.js";

class MovieService {
  async getAllMovies() {
    const moviesDB = db.collection("movies");
    const snapshot = await moviesDB.get();
    const movies = [];
    snapshot.forEach((doc) => {
      movies.push({ id: doc.id, ...doc.data() });
    });
    return movies;
  }

  async getMovieById(movieId) {
    const movieDoc = db.collection("movies").doc(movieId);
    const doc = await movieDoc.get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  }

  async createMovie({ title, description, releaseYear }) {
    const moviesDB = db.collection("movies").doc(title);
    const moviesDoc = await moviesDB.get();

    if (moviesDoc.exists) {
      throw new Error("Filme já cadastrado");
    }

    const omdbData = await omdbApi.get("/", { params: { t: title } });

    if (omdbData.data.Response === "False") {
      throw new Error("Erro ao buscar dados do filme: " + omdbData.data.Error);
    }

    const movieData = {
      title,
      description: description || omdbData.data.Plot,
      releaseYear: omdbData.data.Year,
      director: omdbData.data.Director,
      genre: omdbData.data.Genre,
      actors: omdbData.data.Actors,
      poster: omdbData.data.Poster,
      runtime: omdbData.data.Runtime,
      rating: omdbData.data.imdbRating,
      awards: omdbData.data.Awards,
      createdAt: new Date(),
    };

    await moviesDB.set(movieData);
    return { message: "Filme cadastrado com sucesso", data: { ...movieData } };
  }

  async updateMovie(movieId, movieData) {
    const movieDoc = db.collection("movies").doc(movieId);
    const doc = await movieDoc.get();
    if (doc.exists) {
      await movieDoc.update(movieData);
      const updatedDoc = await movieDoc.get();
      return { message: "Filme atualizado com sucesso", id: updatedDoc.id, ...updatedDoc.data() };
    } else {
      return null;
    }
  }

  async deleteMovie(movieId) {
    const movieDoc = db.collection("movies").doc(movieId);
    const doc = await movieDoc.get();
    if (doc.exists) {
      await movieDoc.delete();
      return true;
    } else {
      return false;
    }
  }
}

export default new MovieService();