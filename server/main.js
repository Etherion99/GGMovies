import { Meteor } from 'meteor/meteor';
import '/imports/api/MoviesMethods';
import '/imports/api/MoviesPublications';
import '/imports/api/PlatformsPublications';
import { MoviesCollection } from '/imports/db/MoviesCollection';
import { PlatformsCollection } from '/imports/db/PlatformCollection';
import { app } from '/express';
import { WebApp } from 'meteor/webapp';

/**
 * Seed data for MoviesCollection.
 * @type {Array<Object>} 
 */
const MOVIES_SEED = [
  {
    title: 'Iron Man',
    synopsis:
      'Anthony Edward Stark, que ha heredado la empresa de armamento Stark Industries de su padre, está en una Afganistán devastada por la guerra con su amigo y enlace militar, el teniente coronel James Rhodes, para demostrar el nuevo misil «Jericó». Luego de la demostración, el convoy sufre una emboscada y Stark es herido de gravedad por un misil que usan los terroristas: irónicamente uno de los propios misiles de su compañía. Un grupo terrorista llamado los Diez Anillos lo captura y encarcela en una cueva.3​ Yinsen, un doctor cautivo con él en la cueva, le implanta un electro magneto conectado a una batería de automóvil en el pecho de Stark para evitar que la metralla que lo hirió llegue a su corazón y eventualmente lo mate, ya que es médicamente imposible retirarla. Raza, líder de los Diez Anillos, le ofrece la libertad a Stark a cambio de construir un misil Jericó para el grupo, pero él y Yinsen saben que aunque realicen el trabajo no cumplirá su palabra de liberarlos.',
    image:
      'https://cdn.europosters.eu/image/750/posters/iron-man-one-sheet-i3287.jpg',
    score: 2.4,
    platforms: [
      {
        _id: 'SSuHySv2fJERxQBwZ',
        name: 'netflix',
        logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
        addedAt: 1700128114000,
        deletedAt: 1702129114000,
      },
      {
        _id: 'wixqo6rQwe9ui6tPq',
        name: 'HBO Max',
        logo: 'https://1000marcas.net/wp-content/uploads/2022/05/HBO-Max-Logo.png',
        addedAt: 1702118114000,
        deletedAt: 1702129114000,
      },
    ],
    isWatched: false,
    reviews: [
      {
        user: 'Juan Pablo Rodríguez',
        description: 'la mejor película que he visto',
        score: 4,
        createdAt: new Date(),
      },
      {
        user: 'Daniel Guzmán',
        description: 'la peor película que he visto',
        score: 2,
        createdAt: new Date(),
      },
      {
        user: 'Lorena García',
        description: 'no la volvería a ver',
        score: 1,
        createdAt: new Date(),
      },
    ],
  },
  {
    title: 'Iron Man 2',
    synopsis:
      'En Rusia, Ivan Vanko mantiene su última conversación con su padre, Anton Vanko, quien muere por una enfermedad. Los medios cubren la revelación de Tony Stark de su identidad como Iron Man. Iván ve esto y comienza a construir un reactor arc miniatura similar al de Stark, ya que usa uno de los bocetos de trabajo de Stark Industries. Seis meses después Tony, quien es considerado una estrella y usa su traje para medios pacíficos, reinstituye la Stark Expo en Flushing Meadows para continuar el legado de su padre, Howard Stark.',
    image:
      'https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@.V1.jpg',
    score: 2.7,
    platforms: [
      {
        _id: 'k96hej95LYHuqHoDE',
        name: 'Disney Plus',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1041px-Disney%2B_logo.svg.png',
        addedAt: 1602128114000,
        deletedAt: 1702129114000,
      },
    ],
    isWatched: false,
    reviews: [
      {
        user: 'Daniel Guzmán',
        description: 'la peor película que he visto',
        score: 2,
        createdAt: new Date(),
      },
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
    ],
  },
  {
    title: 'Iron Man 3',
    synopsis:
      'En un flashback del año 1999 y en plena víspera del Año Nuevo 2000 de en Berna, Suiza, Anthony \'Tony\' Stark realiza una conferencia sobre los circuitos integrados mientras se encontraba en estado de ebriedad. Después de su presentación, es abordado por un científico lisiado llamado Aldrich Killian, quien busca la ayuda de Tony para su proyecto, A.I.M. (Avanzadas Ideas Mecánicas). Tony le dice a Killian que se encontrara con él en la azotea en cinco minutos. Killian, desesperado, espera durante horas, pero el propio Stark no se presenta por lo que al parecer Stark le mintió. Tony y Maya Hansen pasan la noche juntos. Además, ambos tratan de arreglar el error fatal de un virus experimental llamado Extremis desarrollado por Maya. En la actualidad, seis meses después de la Batalla de Nueva York, un frecuentado Tony ha construido obsesivamente varios trajes de Iron Man en su mansión, debido al trauma del agujero de gusano lo que en parte le causa ataques de ansiedad si alguien le recuerda lo que pasó aquel día. Esto causa fricción con su novia, la nueva jefa de Stark Industries, Pepper Potts.',
    image:
      'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@.V1.jpg',
    score: 4.7,
    platforms: [
      {
        _id: 'SSuHySv2fJERxQBwZ',
        name: 'netflix',
        logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
        addedAt: 1701828114000,
        deletedAt: 1702129114000,
      },
      {
        _id: 'k96hej95LYHuqHoDE',
        name: 'Disney Plus',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1041px-Disney%2B_logo.svg.png',
        addedAt: 1701728114000,
        deletedAt: 1702129114000,
      },
    ],
    isWatched: false,
    reviews: [
      {
        user: 'Lorena García',
        description: 'La mejor pelicula',
        score: 5,
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
        description: 'bastante buena',
        score: 4,
        createdAt: new Date(),
      },
    ],
  },
];

/**
 * Seed data for PlatformsCollection.
 * @type {Array<Object>} 
 */
const PLATFORMS_SEED = [
  {
    _id: 'SSuHySv2fJERxQBwZ',
    name: 'Netflix',
    logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
  },
  {
    _id: 'wixqo6rQwe9ui6tPq',
    name: 'HBO Max',
    logo: 'https://1000marcas.net/wp-content/uploads/2022/05/HBO-Max-Logo.png',
  },
  {
    _id: 'k96hej95LYHuqHoDE',
    name: 'Disney Plus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1041px-Disney%2B_logo.svg.png',
  },
];

/**
 * Inserts a movie into the MoviesCollection.
 * @function insertMovie 
 * @param {Object} movie - Movie object to be inserted.
 * @throws {Error} If the insertion fails.
 */
const insertMovie = (movie) =>
  MoviesCollection.insert({
    ...movie,
    createdAt: new Date(),
  });

  /**
 * Inserts a platform into the PlatformsCollection.
 * @function insertPlatform
 * @memberof Server
 * @param {Object} platform - Platform object to be inserted.
 * @throws {Error} If the insertion fails.
 */
const insertPlatform = (platform) => PlatformsCollection.insert(platform);

/**
 * Meteor startup function to initialize and seed collections.
 */
Meteor.startup(async () => {
  if (MoviesCollection.find().count() === 0) {
    MOVIES_SEED.forEach((movie) => insertMovie(movie));
  }
  if (PlatformsCollection.find().count() === 0) {
    PLATFORMS_SEED.forEach((platform) => insertPlatform(platform));
  }
});

/**
 * Connects Meteor with the Express app using WebApp.
 */
WebApp.connectHandlers.use(Meteor.bindEnvironment(app)); 