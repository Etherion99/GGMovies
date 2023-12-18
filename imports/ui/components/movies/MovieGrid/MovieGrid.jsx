import React, { useState } from 'react';
import { MovieCard } from '../MovieCard/MovieCard.jsx';
import { MovieDetails } from '../MovieDetails/MovieDetails.jsx';
import { MoviesCollection } from '/imports/db/MoviesCollection.js';
import { useTracker } from 'meteor/react-meteor-data';
 


/**
 * Functional component representing a grid of movie cards with the option to display detailed movie information.
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.hideCompleted - Indicates whether to hide completed (watched) movies.
 * @returns {JSX.Element} The JSX element representing the movie grid.
 */
export const MovieGrid = ({ hideCompleted }) => {
  // Filters for MongoDB queries
  const hideCompletedFilter = { isWatched: { $ne: true } };
  const pendingOnlyFilter = { ...hideCompletedFilter };

  // Use Tracker hook to reactively fetch movies from the MongoDB collection
  const { movies } = useTracker(() => {
    const noDataAvailable = { movies: [] };
    const handler = Meteor.subscribe('Movies');
    if (!handler.ready()) {
      return { ...noDataAvailable };
    }

    // Fetch movies based on filters and sorting
    const movies = MoviesCollection.find(
      hideCompleted ? pendingOnlyFilter : {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    return { movies };
  });

  // State to manage the selected movie for displaying details
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);

  // Callback to show the details dialog for a selected movie
  const showDialog = (movie) => {
    setSelectedMovie(movie);
    setVisibleDialog(true);
  };

  // Callback to hide the details dialog
  const hideDialog = () => { 
    setVisibleDialog(false);
  };

  // JSX structure for rendering the movie grid with cards
  return (
    <div className='grid px-8'>
      {/* Map through movies and render MovieCard for each */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          clickCallback={() => showDialog(movie)}
        />
      ))}

      {/* Render MovieDetails component for displaying detailed movie information */}
      <MovieDetails hideDialog={hideDialog} selectedMovie={selectedMovie} visible={visibleDialog} />
    </div>
  );
};
