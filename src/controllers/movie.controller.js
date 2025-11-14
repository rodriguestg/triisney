import movieService from "../services/movie.service.js";

class MovieController {
  async getAllMovies(req, res) {
    try {
      const movies = await movieService.getAllMovies();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMovieById(req, res) {
    try {
      const movieId = req.params.id;
      const movie = await movieService.getMovieById(movieId);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createMovie(req, res) {
    try {
      const movieData = req.body;
      const newMovie = await movieService.createMovie(movieData);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMovie(req, res) {
    try {
      const movieId = req.params.id;
      const movieData = req.body;
      const updatedMovie = await movieService.updateMovie(movieId, movieData);
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteMovie(req, res) {
    try {
      const movieId = req.params.id;
      const deleted = await movieService.deleteMovie(movieId);
      if (deleted) {
        res.status(200).json({ message: "Filme deletado com sucesso!" });
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new MovieController();