import React, { useState } from 'react';
import { MovieGrid } from './components/movies/MovieGrid/MovieGrid.jsx';
// primereact styles
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primeflex/primeflex.min.css';
import Header from './components/Header/index.jsx';
import { MovieCreate } from './components/movies/MovieCreate/MovieCreate.jsx';
import { useCrud } from './Providers/CRUD/index.jsx';
import { AddReview } from './components/reviews/AddReview/AddReview.jsx';


/**
 * The main application component.
 * @returns {JSX.Element} The JSX element representing the main application.
 */
export const App = () => {
  //alert('Dale click al poster de alguna película para obtener más detalles');

  const { editDialog, setEditDialog} = useCrud();

  const [createVisible, setCreateVisible] = useState(false); 
  /**
   * State hook to manage the visibility of completed movies.
   * @type {Array}
   */
  const [hideCompleted, setHideCompleted] = useState(false);
  /**
   * Toggles the visibility of completed movies.
   * @function toggleHideCompleted
   * @memberof App
   */
  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };
  return (
    <div className='grid'>  
      <div className='col '>
        <Header 
          hideCompleted={hideCompleted}  
          toggleHideCompleted={toggleHideCompleted}
          createMovie={setCreateVisible}
        /> 
        <MovieGrid 
          hideCompleted={hideCompleted} 
        />
      </div>
      <MovieCreate
        visible={createVisible}
        onHide={setCreateVisible}
      />
      <AddReview 
        visible={editDialog}
        onHide={setEditDialog}
      />
    </div>
  );
};
