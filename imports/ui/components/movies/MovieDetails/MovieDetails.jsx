import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';

// Import components
import { PlatformDetails } from '../../platforms/PlatformDetails/PlatformDetails.jsx';
import { ReviewDetails } from '../../reviews/ReviewDetails/ReviewDetails.jsx';

// Import styles
import './MovieDetails.sass';

/**
 * Functional component representing the detailed view of a movie.
 * @returns {JSX.Element} The JSX element representing the movie details dialog.
 */
export const MovieDetails = ({ hideDialog, selectedMovie, visible }) => (
  <div className='grid p-8'>
    <Dialog
      header={`Detalles de ${selectedMovie?.title}`}
      pt={{
        headerTitle: { className: 'flex justify-content-center text-4xl' },
      }}
      draggable={false}
      style={{ width: '80vw', height: '80vh' }}
      visible={visible}
      onHide={hideDialog}
    >
      <div className='grid p-4'>
        <div className='col-2'>
          <Image
            src={selectedMovie?.image}
            alt={`Poster de ${selectedMovie?.title}`}
            style={{ width: '100%', height: 'auto' }}
            className='movie-img border-round-xl'
          />
        </div>
        <div className='col-8 col-offset-2'>
          <TabView
            pt={{
              navContent: { className: 'nav-content' },
            }}
          >
            <TabPanel header='Sinopsis'>{selectedMovie?.synopsis}</TabPanel>
            <TabPanel header='Reseñas'>
              <ReviewDetails reviews={selectedMovie?.reviews} />
            </TabPanel>
            <TabPanel header='Plataformas'>
              <PlatformDetails platforms={selectedMovie?.platforms} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </Dialog>
  </div>
);
