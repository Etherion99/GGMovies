import React from 'react';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PlatformDetails.sass';

/**
 * Functional component representing the details of platforms associated with a movie.
 * @returns {JSX.Element} The JSX element representing the platform details.
 */
export const PlatformDetails = ({ platforms }) => (
  <div>
    {platforms.map((platform) => {
      return (
        <div key={`platform-${platform?.name}`} className='mt-3 grid'>
          <div className='col-3 flex justify-content-center'>
            <img
              src={platform?.logo}
              alt={`logo ${platform?.name}`}
              className='platform-logo'
            />
          </div>
          <div className='col-7'>
            <strong>Agreado: </strong>
            <span>
              <FontAwesomeIcon
                className='mr-1'
                icon={faCalendarAlt}
                style={{ color: 'white' }}
              />
              {Intl.DateTimeFormat('es-ES').format(new Date(platform?.addedAt))}
            </span>
            <br />
            <br />
            <strong>Eliminado: </strong>
            <span>
              <FontAwesomeIcon
                className='mr-1'
                icon={faCalendarAlt}
                style={{ color: 'white' }}
              />
              {Intl.DateTimeFormat('es-ES').format(
                new Date(platform?.deletedAt)
              )}
            </span>
            <br />
            <br />
          </div>
        </div>
      );
    })}
  </div>
);
