import { Mongo } from 'meteor/mongo';

/**
 * MongoDB collection for storing movie documents.
 * @name MoviesCollection
 * @instance
 * @type {Mongo.Collection} 
 */
export const MoviesCollection = new Mongo.Collection('Movies');
