import React from 'react';
import { Card } from 'primereact/card';
import { ReviewGlyphs } from '../ReviewGlyphs/ReviewGlyphs.jsx';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReviewCard.sass';

/**
 * Functional component representing a review card with user details, review description, and timestamp.
 * @returns {JSX.Element} The JSX element representing the review card.
 */
export const ReviewCard = ({ review }) => {
  return (
    <Card className='review-card'>
      <div className='grid'>
        <div className='col-6'>
          <span className='font-bold'>{review.user}</span>
        </div>
        <div className='col-6 flex justify-content-end'>
          <ReviewGlyphs score={review.score} showScore={false} />
        </div>
      </div>
      <div className='grid pt-5'>{review.description}</div>
      <div className='grid pt-5 fles justify-content-end align-items-center'>
        <FontAwesomeIcon
          className='mr-1'
          icon={faCalendarAlt}
          style={{ color: '#2A323D' }}
        />
        {Intl.DateTimeFormat('es-ES').format(review.createdAt)}
      </div>
    </Card>
  );
};
