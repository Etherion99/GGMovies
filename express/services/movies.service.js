const Boom = require('@hapi/boom');
const { MoviesCollection } = require('/imports/db/MoviesCollection');
const { Meteor } = require('meteor/meteor');

const bound = Meteor.bindEnvironment((callback) => {
  callback();
});

/**
 * MovieService Class
 * @class
 * @description
 * A service class responsible for interacting with the MoviesCollection in a Meteor environment.
 */
class MovieService {
  /**
   * Creates a new MovieService instance.
   * @constructor
   */
  constructor() {}

  /**
   * Creates a new movie in the MoviesCollection.
   * @param {object} movie - Movie data to be inserted.
   * @returns {object} - The created movie data.
   */
  create(movie) {
    const newMovie = Object.assign({}, movie, { createdAt: new Date() });
    bound(() => {
      MoviesCollection.insert(newMovie);
    });
    return newMovie;
  }

  /**
   * Toggles the 'isWatched' property of a movie in the MoviesCollection.
   * @param {string} movieId - ID of the movie to be updated.
   */
  setIsWatched(movieId) {
    let movie;
    bound(() => {
      movie = MoviesCollection.findOne({ _id: movieId });
      if (!movie) {
        throw Boom.notFound('Movie not found.');
      }
    });
    bound(() => {
      MoviesCollection.update(movieId, {
        $set: { isWatched: !movie.isWatched },
      });
    });
  }

  /**
   * Updates an existing movie in the MoviesCollection.
   * @param {string} movieId - ID of the movie to be updated.
   * @param {object} data - Updated movie data.
   * @returns {object} - The updated movie data.
   */
  update(movieId, data) {
    bound(() => {
      const movie = MoviesCollection.findOne({ _id: movieId });
      if (!movie) {
        throw Boom.notFound('Movie not found.');
      }
    });
    bound(() => {
      MoviesCollection.update(movieId, {
        $set: data,
      });
    });
    return data;
  }

  /**
   * Removes a movie from the MoviesCollection.
   * @param {string} movieId - ID of the movie to be removed.
   * @returns {object} - Object containing the removed movie's ID.
   */
  remove(movieId) {
    bound(() => {
      const movie = MoviesCollection.findOne({ _id: movieId });
      if (!movie) {
        throw Boom.notFound('Movie not found.');
      }
    });
    MoviesCollection.remove(movieId);
    return { movieId };
  }

  /**
   * Finds a movie by ID in the MoviesCollection.
   * @param {string} movieId - ID of the movie to be retrieved.
   * @returns {object} - The found movie data.
   */
  findOne(movieId) {
    const movie = MoviesCollection.findOne({ _id: movieId });
    if (!movie) {
      throw Boom.notFound('Movie not found.');
    }
    return movie;
  }

  /**
   * Finds all movies in the MoviesCollection.
   * @returns {array} - An array containing all movies.
   */
  find() {
    const movies = MoviesCollection.find().fetch();
    return movies;
  }

  /**
   * Finds all movies in the MoviesCollection, sorted by createdAt in descending order.
   * @returns {array} - An array containing all movies sorted by createdAt.
   */
  findSortCreateAt() {
    const movies = MoviesCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetch();
    return movies;
  }
}

module.exports = MovieService;
