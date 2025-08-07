import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Star } from "lucide-react";


const BookCard = ({ book, size = "normal" }) => {
  const isLarge = size === "large";
  return (
    <Link to={`/books/${book.id}`} className="group">
      <div
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
          isLarge ? "p-6" : "p-4"
        }`}
      >
        <div className={`flex ${isLarge ? "space-x-6" : "space-x-4"}`}>
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className={`${
              isLarge ? "w-32 h-48" : "w-20 h-28"
            } object-cover rounded-md group-hover:scale-105 transition-transform`}
          />

          <div className="flex-1">
            <h3
              className={`font-bold text-gray-900 group-hover:text-yellow-400 transition-colors ${
                isLarge ? "text-xl mb-2" : "text-lg mb-1"
              }`}
            >
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">
              {book.authors.map((author) => author.name).join(",")}
            </p>

            <div className="flex items-center text-sm text-gray-500 mt-1 gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>{book.averageRating}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {book.ratingCount} review
            </p>

            {isLarge && (
              <p className="text-gray-700 mt-3 line-clamp-3">{book.summary}</p>
            )}

            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(book.publicationDate).getFullYear()}
              <span className="mx-2">•</span>
              {book.pageCount} page
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
