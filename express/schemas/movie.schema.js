const Joi = require('joi');

// Define individual Joi schemas for various movie properties
const id = Joi.string();
const title = Joi.string();
const synopsis = Joi.string();
const image = Joi.string();
const score = Joi.number().min(0).max(5);
const platforms = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    logo: Joi.string().required(),
    addedAt: Joi.number().required(),
    deletedAt: Joi.number().required(),
  })
);
const isWatched = Joi.boolean();
const reviews = Joi.array().items(
  Joi.object({
    user: Joi.string().required(),
    description: Joi.string().required(),
    score: Joi.number().min(0).max(5),
    createdAt: Joi.date().required(),
  })
);

// Define Joi schema for creating a movie
const createMovieSchema = Joi.object({
  title: title.required(),
  synopsis: synopsis.required(),
  image: image.required(),
  score: score.required(),
  platforms: platforms.required(),
  isWatched: isWatched.required(),
  reviews: reviews.required(),
});

// Define Joi schema for updating a movie
const updateMovieSchema = Joi.object({
  title: title,
  synopsis: synopsis,
  image: image,
  score: score,
  platforms: platforms,
  isWatched: isWatched,
  reviews: reviews,
});

// Define Joi schema for getting a movie by ID
const getMovieSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  updateMovieSchema,
  getMovieSchema,
  createMovieSchema,
};
