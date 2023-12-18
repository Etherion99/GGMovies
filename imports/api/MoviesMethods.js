import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { MoviesCollection } from '../db/MoviesCollection';

/**
 * Meteor methods for managing movie-related operations.
 * @namespace MoviesMethods
 */
Meteor.methods({
  /**
   * @typedef {Object} Platform
   * @property {string} id - Unique identifier for the platform.
   * @property {string} name - Name of the platform.
   * @property {string} logo - URL of the platform's logo.
   * @property {number} addedAt - Timestamp when the movie was added to the platform.
   * @property {number} [deletedAt] - Optional timestamp when the movie was deleted from the platform.
   */

  /**
   * @typedef {Object} Review
   * @property {string} user - Username of the user submitting the review.
   * @property {string} description - Description or comments of the review.
   * @property {number} score - The user's score for the movie, ranging from 0 to 5.
   * @property {Date} createdAt - Timestamp of when the review was created.
   */
  
  /**
   * Insert a new movie into the collection.
   * @function MoviesMethods.insert
   * @param {Object} movie - The movie object to be inserted.
   * @param {string} movie.title - The title of the movie.
   * @param {string} movie.synopsis - A brief synopsis or description of the movie.
   * @param {string} movie.image - URL of the movie's image.
   * @param {number} movie.score - The movie's score, ranging from 0 to 5.
   * @param {Platform[]} movie.platforms - Array of platforms where the movie is available.
   * @param {boolean} movie.isWatched - Indicates whether the movie has been watched.
   * @param {Review[]} movie.reviews - Array of user reviews for the movie.
   */
  'Movies.insert'(movie) {
    check(movie, {
      title: String,
      synopsis: String,
      image: String,
      score: Match.Where(
        (score) => typeof score === 'number' && score >= 0 && score <= 5
      ),
      platforms: [
        {
          _id: String,
          name: String,
          logo: String,
          addedAt: Number,
          deletedAt: Match.Maybe(Number),
        },
      ],
      isWatched: Boolean,
      reviews: [
        {
          user: String,
          description: String,
          score: Match.Where(
            (score) => typeof score === 'number' && score >= 0 && score <= 5
          ),
          createdAt: Date,
        },
      ],
    });

    MoviesCollection.insert({
      ...movie,
      createdAt: new Date(),
    });
  },

  /**
   * Remove a movie from the collection.
   * @function MoviesMethods.remove
   * @param {string} movieId - The unique identifier of the movie to be removed.
   * @throws {Meteor.Error} If the movie does not exist or removal fails.
   */
  'Movies.remove'(movieId) {
    check(movieId, String);
    const movie = MoviesCollection.findOne({ _id: movieId });

    if (!movie) {
      throw new Meteor.Error('The movie doesn\'t exist.');
    }

    MoviesCollection.remove(movieId);
  },

  /**
   * Update the 'isWatched' status of a movie.
   * @function MoviesMethods.setIsWatched
   * @param {string} movieId - The unique identifier of the movie to be updated.
   * @param {boolean} isWatched - The new status indicating whether the movie has been watched.
   * @throws {Meteor.Error} If the movie does not exist or update fails.
   */
  'Movies.setIsWatched'(movieId, isWatched) {
    check(movieId, String);
    check(isWatched, Boolean);
    const movie = MoviesCollection.findOne({ _id: movieId });

    if (!movie) {
      throw new Meteor.Error('The movie doesn\'t exist.');
    }

    MoviesCollection.update(movieId, {
      $set: {
        isWatched,
      },
    });
  },
  /**
   * Update fields of a movie.
   * @function MoviesMethods.update
   * @param {string} movieId - The unique identifier of the movie to be updated.
   * @param {Object} updatedFields - The fields to be updated in the movie.
   * @param {string} updatedFields.title - Updated title of the movie.
   * @param {string} updatedFields.synopsis - Updated synopsis or description of the movie.
   * @param {string} updatedFields.image - Updated URL of the movie's image.
   * @param {number} updatedFields.score - Updated score of the movie, ranging from 0 to 5.
   * @param {Platform[]} updatedFields.platforms - Updated array of platforms where the movie is available.
   * @param {boolean} updatedFields.isWatched - Updated status indicating whether the movie has been watched.
   * @param {Review[]} updatedFields.reviews - Updated array of user reviews for the movie.
   * @throws {Meteor.Error} If the movie does not exist or update fails.
   */
  'Movies.update'(movieId, updatedFields) {
    check(movieId, String);
    check(updatedFields, {
      title: Match.Maybe(String),
      synopsis: Match.Maybe(String),
      image: Match.Maybe(String),
      score: Match.Maybe(
        Match.Where(
          (score) => typeof score === 'number' && score >= 0 && score <= 5
        )
      ),
      platforms: Match.Maybe([
        {
          id: Match.Maybe(String),
          name: Match.Maybe(String),
          logo: Match.Maybe(String),
          addedAt: Match.Maybe(Number),
          deletedAt: Match.Maybe(Match.Maybe(Number)), // Puede ser opcional
        },
      ]),
      isWatched: Match.Maybe(Boolean),
      reviews: Match.Maybe([
        {
          user: Match.Maybe(String),
          description: Match.Maybe(String),
          score: Match.Maybe(
            Match.Where(
              (score) => typeof score === 'number' && score >= 0 && score <= 5
            )
          ),
          createdAt: Match.Maybe(Date),
        },
      ]),
    });

    const updateObject = {};
    if (updatedFields.title) updateObject.title = updatedFields.title;
    if (updatedFields.synopsis) updateObject.synopsis = updatedFields.synopsis;
    if (updatedFields.image) updateObject.image = updatedFields.image;
    if (updatedFields.score !== undefined)
      updateObject.score = updatedFields.score;
    if (updatedFields.platforms)
      updateObject.platforms = updatedFields.platforms;
    if (updatedFields.isWatched !== undefined)
      updateObject.isWatched = updatedFields.isWatched;
    if (updatedFields.reviews) updateObject.reviews = updatedFields.reviews;

    const movieFind = MoviesCollection.findOne({ _id: movieId });

    if (!movieFind) {
      throw new Meteor.Error('The movie doesn\'t exist.');
    }

    MoviesCollection.update(movieId, {
      $set: updateObject,
    });
  },
});
