<h1 align="center">
  🎥 GGMOVIES API 🎥
</h1>

<table border="0">
  <tr>
    <td align="center">
      GGMovies API is a Meteor application featuring a graphical interface and implementing multiple Meteor methods, all rigorously tested. Additionally, an Express-based RESTful API has been seamlessly integrated into the Meteor app, enabling external clients to interact with the Movies collection.
    </td>
    <td align="center"> 
        <img src="https://thehill.com/wp-content/uploads/sites/2/2022/05/e92ed228a6924420a8963bdc6c9ddef1.jpg" alt="movies image" />
      </a>
    </td>
  </tr>
</table>

## Table of Contents

1. [Model](#model)
2. [Architecture](#architecture)<br>
  2.1. [Main Technologies](#main-technologies)<br>
  2.2. [Styles and Components Libs](#styles-and-components-libs)<br>
3. [Quickstart for Local Execution](#quickstart-for-local-execution)
4. [Screenshots](#screenshots)
5. [Unit Testing](#unit-testing)
6. [Important Dependencies](#important-dependencies)
7. [RESTful API](#restful-api)<br>
  7.1. [Endpoints](#endpoints)
8. [Important Security and Integration Considerations](#important-security-and-integration-considerations)
9. [Technical Test Comments](#technical-test-comments)

## Model
The application model consists of 3 collections of documents: movies, platforms, and reviews. The reviews and platforms collections were added to enrich the model, but due to time constraints, they only have read endpoints in the API. The reviews model is immersed in the collection of films while platforms is a particular case since it has its own collection with generic information about the platforms and at the same time specific data about the release of each film on each platform is immersed in the movie collection.


## Architecture
The core of the application is built in Meteor, taking advantage of its full-stack framework feature. It includes a NoSQL MongoDB database, collections in Meteor's own backend to manage the model, and a React frontend tightly integrated with Meteor. Additionally, to meet the requirements of the technical test and increase the diversity of technologies implemented during the test, the CRUD operations for Movies were developed in an Express API.

### Main Technologies

[<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/meteor-js-icon.png" height="30px" style="margin-right:10px">MeteorJS](https://www.meteor.com/)<br>

[<img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" height="30px" style="margin-right:10px">Express.js](https://expressjs.com/)<br>

[<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" height="30px" style="margin-right:10px">NoSQL - MongoDB](https://www.mongodb.com/es)<br>

[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="30px" style="margin-right:10px">React](https://es.react.dev/)<br>

### Styles and Components Libs

[<img src="https://pbs.twimg.com/profile_images/1491038861224517637/s-H1KgWO_400x400.png" height="30px" style="margin-right:10px">FontAwesome](https://fontawesome.com/)<br>

[<img src="https://i2.wp.com/www.primefaces.org/wp-content/uploads/2017/08/primereact-transparent.png?resize=250%2C250&ssl=1" height="30px" style="margin-right:10px">Primereact](https://primereact.org/)<br>

## Quickstart for Local Execution

1. Clone project using `git clone https://github.com/Etherion99/GGMovies`.
2. Install Meteor with `npm install -g meteor`.
3. Install dependencies with `meteor npm install`.
4. Run using `meteor run`.

**Note:** Executing these steps automatically starts the Express API.

## Quickstart for Local Execution (Docker)

1. Clone project using `git clone https://github.com/Etherion99/GGMovies`.
2. Install Meteor with `npm install -g meteor`.
3. Install dependencies with `meteor npm install`.
4. Create image and run container using `npm run docker:build-start`.

## Screenshots
<table border="0">
  <tr>
    <td align="center" colspan="2">
        <img src="./resources/readme/home.png" alt="movies image" /> 
    </td>
  </tr>
  <tr>
    <td align="center">
        <img src="./resources/readme/home-responsive.png" alt="movies image" /> 
    </td>
    <td align="center">
        <img src="./resources/readme/home-responsive-mobile.png" alt="movies image" /> 
    </td>
  </tr>
  <tr>
    <td align="center">
        <img src="./resources/readme/resume.png" alt="movies image" />
    </td>
    <td align="center">
        <img src="./resources/readme/reviews.png" alt="movies image" /> 
    </td>
  </tr>
  <tr>
    <td align="center">
        <img src="./resources/readme/platforms.png" alt="movies image" /> 
    </td>
    <td align="center">
        <img src="./resources/readme/add-review.png" alt="movies image" />
    </td>
  </tr>
</table>

## Unit Testing

1. Run `meteor npm test`
<img src="./resources/readme/tests.png" alt="movies image" />

## Important Dependencies

- **fontawesome:** is a library that provides scalable vector icons that 
can be customized and styled using CSS, enhancing visual design and 
user interface elements in web development.

- **PrimeReact:** is a UI component library for React applications. 
It provides a set of customizable and responsive components that 
enable developers to build modern and visually appealing user interfaces.

- **Express:** is a web application framework for Node.js 
that simplifies the process of building robust and scalable web applications 
by providing a set of powerful features and tools.

- **Hapi/Boom:** is a utility library for handling HTTP errors in Node.js applications, 
simplifying the process of creating and formatting error responses.

- **cors:** The `cors` npm package is a middleware for Node.js web applications. It enables Cross-Origin Resource Sharing (CORS) support by allowing or restricting HTTP requests from different origins. This package helps handle CORS headers, making it easier to configure and manage cross-origin requests in a Node.js application.

- **Joi:** is a JavaScript library for validating and defining the structure of objects. 
It's commonly used in Node.js applications for input validation.


## RESTful API
This API was developed in Express and is documented in [Postman](./docs/Movies.postman_collection.json)

### Endpoints

- http://localhost:3000/api/v1/movies : This endpoint returns all movies from the database when you make a GET request.
- http://localhost:3000/api/v1/movies/sortCreateAt : This endpoint returns the details of a movie by providing its Id. 
- http://localhost:3000/api/v1/movie : This endpoint enables the creation of a movie by sending an object in the request body, as illustrated below.
```
{
    "title": "title test postman 3",
    "synopsis":
      "synopsis test postman",
    "image":
      "https://cdn.europosters.eu/image/750/posters/iron-man-one-sheet-i3287.jpg",
    "score": 3.75,
    "platforms": [
      {
        "id": "3wJbAH6mht4E8jn4K",
        "name": "netflix",
        "logo": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png",
        "addedAt": 1702128114,
        "deletedAt": 1702129114
      },
      {
        "id": "9dYF2rdWNsRjp3Jz5",
        "name": "HBO Max",
        "logo": "https://1000marcas.net/wp-content/uploads/2022/05/HBO-Max-Logo.png",
        "addedAt": 1702128114,
        "deletedAt": 1702129114
      }
    ],
    "isWatched": false,
    "reviews": [
      {
        "user": "user 1",
        "description": "la mejor película que he visto",
        "score": 4,
        "createdAt": "2023-12-14T17:57:03.654Z"
      },
      {
        "user": "user 2",
        "description": "la peor película que he visto",
        "score": 2,
        "createdAt": "2023-12-14T17:57:03.654Z"
      },
      {
        "user": "user 3",
        "description": "no la volvería a ver",
        "score": 1,
        "createdAt": "2023-12-14T17:57:03.654Z"
      }
    ]
  }
```
- http://localhost:3000/api/v1/movie/:id : This endpoint allows the update of any attribute of a movie by providing its id.

- http://localhost:3000/api/v1/movie/setIsWatched/:id : This endpoint modifies the viewing status of a specific movie by updating the "isWatched" property using its id.

- http://localhost:3000/api/v1/movie/:id : This endpoint deletes a movie by providing its id.

## Important Security and Integration Considerations

* The removal of the "insecure" and "autopublish" packages was a crucial measure to enhance the application's security. This decision was made with a future-oriented perspective, taking into account the scalability of the platform and advanced user management. By doing so, a solid foundation is established for more robust and controlled implementations, laying the groundwork for the ongoing growth and evolution of the application.

* The `Meteor.bindEnvironment` function is being used in the movies service (movies.service) of an Express application with Meteor to manage Fiber context during asynchronous operations. In an Express application using Meteor, this approach ensures that asynchronous operations related to movies are properly bound to the Meteor execution environment. This is crucial when communicating with Meteor functions that depend on Fiber, preventing issues associated with the loss of execution context. In summary, by using `Meteor.bindEnvironment` in the movies service, it ensures the consistent and predictable execution of asynchronous operations within the Meteor environment, avoiding errors related to asynchrony.

## Technical Test Comments

* The integration of Meteor with the Express API to leverage the integrated Mongo DB in Meteor was done only for demonstrative purposes to meet the API documentation criteria without missing the opportunity to implement Meteor.

* Unit tests run on Meteor methods.

* ESLint is configured for the Express API.

* The Express API was documented with Postman, and the collection was attached [here](./docs/Movies.postman_collection.json).

* The application (including Meteor and Express) was deployed together on an AWS machine [here](https://sebastian-trujillo.me/ggmovies).

* The application has both an API and a React interface sufficient for testing basic CRUD operations with the following operations:
  * List movies
  * List platforms
  * Add movies
  * Delete movies (a deletion confirmation modal is missing due to time constraints)
  * Add reviews (when added, the added and deleted data is automatically filled)
  * Mark a movie as viewed
  * Update movies (only available through the API, although marking it as viewed or adding reviews technically constitutes an update).

* To make the most of the interface experience, it is recommended to click on the poster of a movie to see more details about it and use the "Viewed Movies" filter at the top of the interface.

* The first time you run the Meteor application, the database will be automatically populated with test data. To repopulate it, it is necessary to delete the Mongo DB and rerun the project (you can view the Mongo URL with the command `meteor mongo --url`).

* Due to time constraints, the Express API is summarized to the movie model only but has validation using schemas with Joi.

* The UI has a responsive design
