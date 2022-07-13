/* eslint-disable react/prop-types */
import React from 'react';
import formatDate from '../../questionsAnswers/utils/formatDate';

function ReviewsDate({ date }) {
  return (
    <div>
      {formatDate(date)}
    </div>
  );
}

export default ReviewsDate;