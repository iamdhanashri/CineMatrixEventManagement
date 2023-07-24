// routes/movies.js
const express = require("express");
const movieRouter = express.Router();
const { movieModel } = require("../model/movie.model.js");

// GET all movies
movieRouter.get("/", async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new movie
movieRouter.post("/", async (req, res) => {
  const movie = new movieModel({
    title: req.body.title,
    description: req.body.description,
    img:req.body.img
    // Populate other movie-related fields
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific movie by ID
movieRouter.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

// PUT (update) a specific movie by ID
movieRouter.put("/:id", getMovie, async (req, res) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title;
  }
  if (req.body.description != null) {
    res.movie.description = req.body.description;
  }
  // Update other movie-related fields

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific movie by ID
movieRouter.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to retrieve a specific movie by ID
async function getMovie(req, res, next) {
    const movie = req.params.id
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();

}

// ----------------------------
// const getMovieByIdMiddleware = (req, res, next) => {
//   const movieId = parseInt(req.params.id); // Assuming the ID is passed as a URL parameter

//   const movie = movies.find((movie) => movie.id === movieId);

//   if (!movie) {
//     // If the movie with the specified ID is not found, send a 404 response
//     return res.status(404).json({ error: 'Movie not found' });
//   }

//   // Attach the found movie to the request object for further processing in route handlers
//   req.movie = movie;
//   next();
// };

// module.exports = getMovieByIdMiddleware;


// ------------------


movieRouter.get('/:id', (req, res, next) => {
  const movieId = parseInt(req.params.id);

  // Sample logic to find a movie by ID (replace this with your actual movie data retrieval logic)
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    // If the movie is not found, create a new Error object with a custom status code and message
    const error = new Error('Movie not found');
    error.statusCode = 404;
    return next(error);
  }

  res.json(movie);
});

// -------------------------

module.exports = {
  movieRouter,
};
