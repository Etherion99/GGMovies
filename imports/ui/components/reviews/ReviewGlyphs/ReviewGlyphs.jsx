import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

// Import styles
import './ReviewGlyphs.sass';

/**
 * Functional component representing review glyphs, including full stars, half stars, and empty stars based on a given score.
 * @returns {JSX.Element} The JSX element representing the review glyphs.
 */
export const ReviewGlyphs = ({ score, showScore = true }) => {
  const fullStars = Math.floor(score);
  const decimalPart = score - fullStars;

  // Create an array with full stars
  const stars = Array.from({ length: fullStars }, (_, index) => (
    <FontAwesomeIcon
      className='star'
      icon={faStar}
      key={index}
      style={{ color: 'gold' }}
    />
  ));

  // Add a half star if necessary
  if (decimalPart >= 0.5) {
    stars.push(
      <div className='half-star-container' key='half'>
        <FontAwesomeIcon
          className='star'
          icon={faStar}
          style={{ color: 'gray' }}
        />
        <FontAwesomeIcon
          className='half-star absolute'
          icon={faStarHalf}
          style={{ color: 'gold', left: '0' }}
        />
      </div>
    );
  }

  const remainingStars = 5 - stars.length;

  // Add empty stars
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <FontAwesomeIcon
        className='star'
        icon={faStar}
        key={i + fullStars}
        style={{ color: 'gray' }}
      />
    );
  }

  return (
    <div>
      <div className='grid'>{stars}</div>
      <div className='grid w-full justify-content-center mt-2'>
        {showScore && <span className='score'>{score}</span>}
      </div>
    </div>
  );
};
