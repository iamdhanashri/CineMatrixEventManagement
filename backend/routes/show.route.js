// routes/movies.js
const express = require("express");
const showRouter = express.Router();
// const Movie = require('../models/movie');
const { showModel } = require("../model/show.model");

// GET all shows
showRouter.get("/", async (req, res) => {
  try {
    const shows = await showModel.find();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new show
showRouter.post("/", async (req, res) => {
  const show = new showModel({
    movie: req.body.movieId, // Assuming the client sends the movie ID in the request body
    showTime: req.body.showTime,
    category: req.body.category,
    // Populate other show-related fields
  });

  try {
    const newShow = await show.save();
    res.status(201).json(newShow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific show by ID
showRouter.get("/:id", getShow, (req, res) => {
  res.json(res.show);
});

// PUT (update) a specific show by ID
showRouter.put("/:id", getShow, async (req, res) => {
  if (req.body.showTime != null) {
    res.show.showTime = req.body.showTime;
  }
  if (req.body.category != null) {
    res.show.category = req.body.category;
  }
  // Update other show-related fields

  try {
    const updatedShow = await res.show.save();
    res.json(updatedShow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific show by ID
showRouter.delete("/:id", getShow, async (req, res) => {
  try {
    await res.show.remove();
    res.json({ message: "Show deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to retrieve a specific show by ID
async function getShow(req, res, next) {
  try {
    show = await Show.findById(req.params.id);
    if (show == null) {
      return res.status(404).json({ message: "Show not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.show = show;
  next();
}

module.exports = { showRouter };
