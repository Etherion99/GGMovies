import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useCrud } from '../../../Providers/CRUD';

// Import components
import { ReviewGlyphs } from '../../reviews/ReviewGlyphs/ReviewGlyphs';
import { PlatformGlyphs } from '../../platforms/PlatformGlyphs/PlatformGlyphs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


// Import styles
import './MovieCard.sass'; 


/**
 * Functional component representing a card displaying movie details.
 * @returns {JSX.Element} The JSX element representing the movie card.
 */
export const MovieCard = ({ movie, clickCallback }) => {   

  // Importa el hook personalizado useCrud para acceder a las funciones y datos del contexto CRUD.
  const { deleteMovie, toggleWatched, setMovieToEdit, setEditDialog } = useCrud();

  const addReview = () => {
    setMovieToEdit(movie);
    setEditDialog(true);
  }

  return (
    <div className='movie-card col-12 md:col-6 xl:col-4 px-6 md:px-2 xl:px-4'>
      <Card
        title={movie.title}
        pt={{
          title: { className: 'flex justify-content-center text-4xl' },
        }}
      >
        <div className='flex flex-column justify-content-center'>
          <div className='flex flex-row gap-3 justify-content-around align-content-center pb-3 pr-8 pl-8'> 
            <Button 
              icon={<FontAwesomeIcon icon={faPencil} style={{color: '#ffffff', marginRight: '5px'}} />}
              label='reseñar'
              style={{color: '#ffffff'}}
              onClick={addReview}
            />
            <Button 
              icon={<FontAwesomeIcon icon={faTrash} style={{color: '#ffffff', marginRight: '5px'}} />} severity='danger' 
              label='eliminar'
              style={{color: '#ffffff'}}
              onClick={() => deleteMovie(movie._id)}
            />
          </div>
          <img
            src={movie.image}
            alt={`Poster de ${movie.title}`}
            className='border-round-xl'
            onClick={clickCallback}
          />
        </div>
        <div className='flex justify-content-between align-items-center mt-5'>
          <ReviewGlyphs score={movie.score} />
          <PlatformGlyphs activePlatforms={movie.platforms} />         
        </div>
        <div className='flex justify-content-center mt-3'>
          <Button
            label={movie.isWatched ? 'Marcar vista' : 'Marcar no vista'}
            icon={
              movie.isWatched ? 
              <FontAwesomeIcon icon={faEyeSlash} style={{marginRight: '5px'}}/>:
              <FontAwesomeIcon icon={faEye} style={{marginRight: '5px'}}/>
            }
            style={{color: '#ffffff'}}
            onClick={() =>
              toggleWatched({ _id: movie._id, isWatched: movie.isWatched })
            }>
          </Button>
        </div>
      </Card>
    </div>
  );
};
