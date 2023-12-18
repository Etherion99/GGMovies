// Header.js
import React from 'react';
import './header.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'primereact/button';

const Header = ({ toggleHideCompleted, hideCompleted, createMovie }) => {
  return (
    <div className='header'>
      <h1 className='flex justify-content-center text-5xl'>
        Bienvenido a GGMovies 🎥
      </h1>
      <nav className='my-3'>
        <ul>
          <li>
            {hideCompleted ? (
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ color: '#ffffff', marginRight: '5px' }}
                  />
                }
                label='quitar filtro'
                style={{ color: '#ffffff' }}
                severity='secondary'
                onClick={toggleHideCompleted}
              />
            ) : (
              <Button
                icon={
                  <FontAwesomeIcon icon={faEye} style={{ color: '#ffffff', marginRight: '5px' }} />
                }
                label='filtrar solo por vistas'
                style={{ color: '#ffffff' }}
                severity='secondary'
                onClick={toggleHideCompleted}
              />
            )}
          </li>
          <li>
            <Button
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', marginRight: '5px' }} />
              }
              label='película'
              severity='success'
              style={{ color: '#ffffff' }}
              onClick={() => createMovie(true)}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
