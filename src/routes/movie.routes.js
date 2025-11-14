import { Router } from "express";
import movieController from "../controllers/movie.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => movieController.getAllMovies(req, res));
router.get("/:id", (req, res) => movieController.getMovieById(req, res));
router.post("/", authMiddleware, (req, res) => movieController.createMovie(req, res));
router.put("/:id", authMiddleware, (req, res) => movieController.updateMovie(req, res));
router.delete("/:id", authMiddleware, (req, res) => movieController.deleteMovie(req, res));

export default router;