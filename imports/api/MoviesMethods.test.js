import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { MoviesCollection } from '../db/MoviesCollection';
import { mockMethodCall } from 'meteor/quave:testing';
import './MoviesMethods';

/**
 * Integration tests for the Movies collection methods.
 * @module MoviesMethodsTests
 */

/**
 * Describe block for Movies collection methods.
 * @function describe
 * @param {string} description - The description of the test suite.
 * @param {Function} tests - The test cases to be executed.
 */
if (Meteor.isServer) {
  describe('Movies', () => {
    /**
     * Describe block for Movies collection methods.
     * @function describe
     * @param {string} description - The description of the test suite.
     * @param {Function} tests - The test cases to be executed.
     */
    describe('methods', () => {
      let movieId;

      let movieFind;

      /**
       * Setup function to be executed before each test case.
       * @function beforeEach
       */
      beforeEach(() => {
        MoviesCollection.remove({});

        movieId = MoviesCollection.insert({
          title: 'Test movie title',

          synopsis:
            'En un flashback del año 1999 y en plena víspera del Año Nuevo 2000 de en Berna, Suiza, Anthony \'Tony\' Stark realiza una conferencia sobre los circuitos integrados mientras se encontraba en estado de ebriedad. Después de su presentación, es abordado por un científico lisiado llamado Aldrich Killian, quien busca la ayuda de Tony para su proyecto, A.I.M. (Avanzadas Ideas Mecánicas). Tony le dice a Killian que se encontrara con él en la azotea en cinco minutos. Killian, desesperado, espera durante horas, pero el propio Stark no se presenta por lo que al parecer Stark le mintió. Tony y Maya Hansen pasan la noche juntos. Además, ambos tratan de arreglar el error fatal de un virus experimental llamado Extremis desarrollado por Maya. En la actualidad, seis meses después de la Batalla de Nueva York, un frecuentado Tony ha construido obsesivamente varios trajes de Iron Man en su mansión, debido al trauma del agujero de gusano lo que en parte le causa ataques de ansiedad si alguien le recuerda lo que pasó aquel día. Esto causa fricción con su novia, la nueva jefa de Stark Industries, Pepper Potts.',

          image:
            'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@.V1.jpg',

          score: 5,

          platforms: [
            {
              id: '3wJbAH6mht4E8jn4K',
              name: 'netflix',
              logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
              addedAt: 1702128114,
              deletedAt: 1702129114,
            },
            {
              id: 'twGuKuxCJQt5hWKQs',
              name: 'Disney Plus',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1041px-Disney%2B_logo.svg.png',
              addedAt: 1702128114,
              deletedAt: 1702129114,
            },
          ],
          isWatched: false,
          reviews: [
            {
              user: 'Lorena García',
              description: 'no la volvería a ver',
              score: 1,
              createdAt: new Date(),
            },
            {
              user: 'Samuel Deluque',
              description: 'Vegeta777777777',
              score: 5,
              createdAt: new Date(),
            },
            {
              user: 'Daniela Martínez',
              description: 'que porquería',
              score: 2,
              createdAt: new Date(),
            },
          ],
        });

        movieFind = MoviesCollection.findOne(movieId);
      });

      /**
       * Test case for deleting a movie.
       * @function it
       * @memberof ServerTests.MoviesMethodsTests.methods
       */
      it('Can delete the movie', () => {
        mockMethodCall('Movies.remove', movieId);
        assert.equal(MoviesCollection.find().count(), 0);
      });

      /**
       * Test case for changing the status of a movie.
       * @function it
       * @memberof ServerTests.MoviesMethodsTests.methods
       */
      it('Can change the status of a movie', () => {
        const originalMovie = MoviesCollection.findOne(movieId);
        mockMethodCall(
          'Movies.setIsWatched',
          movieId,
          !originalMovie.isWatched
        );
        const updatedMovie = MoviesCollection.findOne(movieId);
        assert.notEqual(updatedMovie.isWatched, originalMovie.isWatched);
      });

      /**
       * Test case for inserting new movies.
       * @function it
       * @memberof ServerTests.MoviesMethodsTests.methods
       */
      it('Can insert new movies', () => {
        const movie = {
          title: 'Test movie title 2',
          synopsis:
            'En un flashback del año 1999 y en plena víspera del Año Nuevo 2000 de en Berna, Suiza, Anthony \'Tony\' Stark realiza una conferencia sobre los circuitos integrados mientras se encontraba en estado de ebriedad. Después de su presentación, es abordado por un científico lisiado llamado Aldrich Killian, quien busca la ayuda de Tony para su proyecto, A.I.M. (Avanzadas Ideas Mecánicas). Tony le dice a Killian que se encontrara con él en la azotea en cinco minutos. Killian, desesperado, espera durante horas, pero el propio Stark no se presenta por lo que al parecer Stark le mintió. Tony y Maya Hansen pasan la noche juntos. Además, ambos tratan de arreglar el error fatal de un virus experimental llamado Extremis desarrollado por Maya. En la actualidad, seis meses después de la Batalla de Nueva York, un frecuentado Tony ha construido obsesivamente varios trajes de Iron Man en su mansión, debido al trauma del agujero de gusano lo que en parte le causa ataques de ansiedad si alguien le recuerda lo que pasó aquel día. Esto causa fricción con su novia, la nueva jefa de Stark Industries, Pepper Potts.',
          image:
            'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@.V1.jpg',
          score: 5,
          platforms: [
            {
              _id: '3wJbAH6mht4E8jn4K',
              name: 'netflix',
              logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
              addedAt: 1702128114,
              deletedAt: 1702129114,
            },
            {
              _id: 'twGuKuxCJQt5hWKQs',
              name: 'Disney Plus',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1041px-Disney%2B_logo.svg.png',
              addedAt: 1702128114,
              deletedAt: 1702129114,
            },
          ],
          isWatched: false,
          reviews: [
            {
              user: 'Lorena García',
              description: 'no la volvería a ver',
              score: 1,
              createdAt: new Date(),
            },
            {
              user: 'Samuel Deluque',
              description: 'Vegeta777777777',
              score: 5,
              createdAt: new Date(),
            },
            {
              user: 'Daniela Martínez',
              description: 'que porquería',
              score: 2,
              createdAt: new Date(),
            },
          ],
        };
        mockMethodCall('Movies.insert', movie);

        const movies = MoviesCollection.find({}).fetch();
        assert.equal(movies.length, 2);
        assert.isTrue(movies.some((item) => item.title === movie.title));
      });

      /**
       * Test case for updating a movie successfully.
       * @function it
       * @memberof ServerTests.MoviesMethodsTests.methods
       */
      it('Can update a movie successfully', () => {
        const updatedFields = {
          title: 'Updated Movie Title',
          synopsis: 'Updated movie synopsis.',
          image: 'https://example.com/updated-image.jpg',
          score: 4,
          platforms: [
            {
              id: '9dYF2rdWNsRjp3Jz5',
              addedAt: 1702128114,
              deletedAt: null,
            },
          ],
          isWatched: true,
        };

        mockMethodCall('Movies.update', movieId, updatedFields);

        const updatedMovie = MoviesCollection.findOne(movieId);
        assert.equal(updatedMovie.title, updatedFields.title);
        assert.equal(updatedMovie.synopsis, updatedFields.synopsis);
        assert.equal(updatedMovie.image, updatedFields.image);
        assert.equal(updatedMovie.score, updatedFields.score);
        assert.deepEqual(updatedMovie.platforms, updatedFields.platforms);
        assert.equal(updatedMovie.isWatched, updatedFields.isWatched);
      });

      /**
       * Test case for partially updating a movie successfully.
       * @function it
       * @memberof ServerTests.MoviesMethodsTests.methods
       */
      it('Can partially update a movie successfully', () => {
        const updatedFields = {
          title: 'Updated Movie Title',
          score: 4,
          isWatched: true,
        };

        mockMethodCall('Movies.update', movieId, updatedFields);

        const updatedMovie = MoviesCollection.findOne(movieId);
        assert.equal(updatedMovie.title, updatedFields.title);
        assert.equal(updatedMovie.score, updatedFields.score);
        assert.equal(updatedMovie.isWatched, updatedFields.isWatched);

        assert.equal(updatedMovie.synopsis, movieFind.synopsis);
        assert.equal(updatedMovie.image, movieFind.image);
      });
    });
  });
}
