import { Meteor } from 'meteor/meteor';
import { PlatformsCollection } from '../db/PlatformCollection';

/**
 * Publishes the Platforms collection to clients.
 * @function publishTasks 
 * @name Meteor.publish
 * @param {string} _ 'Platforms' - The name of the publication.
 * @param {Function} publishTasks - The publication function.
 * @returns {Mongo.Cursor} A cursor representing the result of the publication, containing documents from the Platforms collection.
 * @throws {Meteor.Error} If an error occurs during the publication.
 */
Meteor.publish('Platforms', function publishTasks() {
  return PlatformsCollection.find();
});
