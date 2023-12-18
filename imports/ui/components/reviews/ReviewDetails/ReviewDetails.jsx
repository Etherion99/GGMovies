import React from 'react';
import { Carousel } from 'primereact/carousel';
import './ReviewDetails.sass';
import { ReviewCard } from '../ReviewCard/ReviewCard';

export const ReviewDetails = ({ reviews }) => {
  /**
   * Template function for rendering each review card in the carousel.
   * @function cardTemplate
   * @param {Object} review - The review object to be displayed in the card.
   * @returns {JSX.Element} The JSX element representing a review card.
   */
  const cardTemplate = (review) => <ReviewCard review={review} />;

  return (
    <Carousel
      value={reviews}
      numVisible={1}
      numScroll={1}
      itemTemplate={cardTemplate}
    />
  );
};
