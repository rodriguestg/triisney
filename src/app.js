import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

export default app;