import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Calendar,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedBooks } from "@/State/Book/Action";

const BookRecommendations = () => {
  const dispatch = useDispatch()
  const {books} = useSelector((state) => state.book);
  const bookList = Array.isArray(books.content) ? books.content : books;
  const [scrollPosition, setScrollPosition] = useState(0);
  const booksL = bookList.slice(0, 10);

  useEffect(()=>{
    dispatch(getTopRatedBooks())
  },[dispatch])

  const scrollLeft = () => {
    const container = document.getElementById("book-container");
    const newPosition = Math.max(0, scrollPosition - 320);
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const scrollRight = () => {
    const container = document.getElementById("book-container");
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newPosition = Math.min(maxScroll, scrollPosition + 320);
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended Books
          </h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
              disabled={scrollPosition <= 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            id="book-container"
            onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map((book) => (
              <Link
                to={`/books/${book.id}`}
                key={book.id}
                className="flex-none w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
              >
                <div className="flex p-4 gap-4">
                  <div className="flex-none">
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md overflow-hidden">
                      <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.style.background =
                            "linear-gradient(to bottom right, #3b82f6, #8b5cf6)";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 truncate group-hover:text-yellow-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {book.authors[0]?.name}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {book.averageRating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({book.ratingCount} review)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(book.publicationDate).getFullYear()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{book.pageCount} page</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {book.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Read More
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendations;
