import { Meteor } from 'meteor/meteor';
import { MoviesCollection } from '../db/MoviesCollection';

/**
 * Publishes the Movies collection to clients.
 * @function publishTasks 
 * @name Meteor.publish
 * @param {string} _ 'Movies' - The name of the publication.
 * @param {Function} publishTasks - The publication function.
 * @returns {Mongo.Cursor} A cursor representing the result of the publication, containing documents from the Movies collection.
 * @throws {Meteor.Error} If an error occurs during the publication.
 */
Meteor.publish('Movies', function publishTasks() {
  return MoviesCollection.find();
});
