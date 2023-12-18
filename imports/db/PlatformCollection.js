import { Mongo } from 'meteor/mongo';

/**
 * MongoDB collection for storing platform documents.
 * @name PlatformsCollection
 * @instance
 * @type {Mongo.Collection} 
 */
export const PlatformsCollection = new Mongo.Collection('Platforms');
