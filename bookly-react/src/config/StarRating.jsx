import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 'w-4 h-4' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} className={`${size} fill-yellow-400 text-yellow-400`} />;
        } else if (index === fullStars && hasHalfStar) {
          return <Star key={index} className={`${size} text-yellow-400`} style={{ clipPath: 'inset(0 50% 0 0)' }} />;
        } else {
          return <Star key={index} className={`${size} text-gray-300`} />;
        }
      })}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;