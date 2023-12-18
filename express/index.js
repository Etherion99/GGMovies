const express = require('express');
const cors = require('cors'); 

// Import error handling middlewares
const {
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

// Import data validation middleware
const { validatorHandler } = require('./middlewares/validator.handler');

// Import validation schemas
const {
  createMovieSchema,
  getMovieSchema, 
  updateMovieSchema,
} = require('./schemas/movie.schema');

// Import the movie service
const MovieService = require('./services/movies.service');

// Create an instance of the movie service
const movieService = new MovieService();

// Create an instance of the Express application
const app = express();

// Configure Express to use JSON and allow CORS requests
app.use(express.json());
app.use(cors()); 

// API Routes

// Get all movies
app.get('/api/v1/movies', (req, res, next) => {
  try {
    const movies = movieService.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// Get movies sorted by creation date
app.get('/api/v1/movies/sortCreateAt', (req, res, next) => {
  try {
    const movies = movieService.findSortCreateAt();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// Get a movie by its ID
app.get(
  '/api/v1/movies/:id',
  validatorHandler(getMovieSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = movieService.findOne(id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

// Create a new movie
app.post(
  '/api/v1/movie',
  validatorHandler(createMovieSchema, 'body'),
  (req, res, next) => {
    try { 
      const body = req.body;
      const newMovie = movieService.create(body);
      res.json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

// Update a movie by its ID
app.patch(
  '/api/v1/movie/:id',
  validatorHandler(getMovieSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const movie = movieService.update(id, body);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

// Set the 'watched' status of a movie by its ID
app.patch(
  '/api/v1/movie/setIsWatched/:id',
  validatorHandler(getMovieSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params; 
      const movie = movieService.setIsWatched(id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

// Delete a movie by its ID
app.delete(
  '/api/v1/movie/:id',
  validatorHandler(getMovieSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      movieService.remove(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
); 

// Use error handling middlewares
app.use(boomErrorHandler);
app.use(errorHandler);

// Export the Express application
module.exports = { app };