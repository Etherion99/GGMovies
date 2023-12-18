import React, { useState } from 'react';

// Crea un contexto de React para proporcionar y consumir datos relacionados con operaciones CRUD.
const CrudContext = React.createContext();

function CrudProvider({ children }) {

  // Estado para almacenar la película actualmente seleccionada para editar.
  const [movieToEdit, setMovieToEdit] = useState(null);

  const [editDialog, setEditDialog] = useState(false);

  /**
   * Elimina una película mediante una llamada al método remoto 'Movies.remove' en Meteor.
   * @param {string} _id - Identificador único de la película a eliminar.
   */
  const deleteMovie = (_id) => {
    Meteor.call('Movies.remove', _id);
  };

  /**
   * Cambia el estado 'isWatched' de una película mediante una llamada al método remoto 'Movies.setIsWatched' en Meteor.
   * @param {Object} movie - Objeto que contiene el identificador único (_id) y el estado actual de 'isWatched'.
   */
  const toggleWatched = ({ _id, isWatched }) => {
    Meteor.call('Movies.setIsWatched', _id, !isWatched);
  };

  /**
   * Crea una nueva película mediante una llamada al método remoto 'Movies.insert' en Meteor.
   * @param {string} title - Título de la película.
   * @param {string} synopsis - Sinopsis de la película.
   * @param {string} image - URL de la imagen de la película.
   * @param {number} score - Puntuación de la película.
   * @param {Object[]} platforms - Array de plataformas en las que está disponible la película.
   */
  const createMovie = (title, synopsis, image, score, platforms) => {
    const newMovie = {
      title: title,
      synopsis: synopsis,
      image: image,
      score: score,
      platforms: platforms,
      isWatched: false,
      reviews: [],
    };
    Meteor.call('Movies.insert', newMovie);
  };

  /**
   * Agrega una nueva revisión a la película actualmente seleccionada y actualiza la base de datos mediante el método 'Movies.update'.
   * @param {Object} newReview - Objeto que representa la nueva revisión a agregar.
   */
  const addReviews =  (newReview) => { 

    // Obtener las revisiones actuales de la película
    const currentReviews = movieToEdit.reviews || [];

    // Agregar la nueva revisión al array de reseñas
    const updatedReviews = [...currentReviews, newReview];

    const totalScore = updatedReviews.reduce((sum, review) => sum + review.score, 0);

    Meteor.call('Movies.update', movieToEdit._id, { reviews: updatedReviews, score: Math.round(totalScore/updatedReviews.length * 10) / 10 });

  }

  // Objeto que contiene las funciones y datos relacionados con las operaciones CRUD.
  const crud = {
    movieToEdit,
    setMovieToEdit,
    deleteMovie,
    toggleWatched,
    createMovie,
    editDialog, 
    setEditDialog,
    addReviews
  };

  // Provee el contexto CRUD a los componentes hijos.
  return <CrudContext.Provider value={crud}> {children} </CrudContext.Provider>;
}

/**
 * Hook personalizado para consumir el contexto CRUD.
 * @returns {Object} - Objeto que contiene funciones y datos relacionados con las operaciones CRUD.
 */
function useCrud() {
  const crud = React.useContext(CrudContext);

  return crud;
}

// Exporta el proveedor de contexto y el hook personalizado para su uso en otros archivos.
export { CrudProvider, useCrud };
