import React, { useState, useMemo, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "@/State/Book/Action";

const Books = () => {
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const booksPerPage = 5;

  const {books} = useSelector((state) => state.book);
  

  useEffect(()=>{
    dispatch(getAllBooks())
  },[dispatch])

    useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortBy]);

  const filteredAndSortedBooks = useMemo(() => {
    const bookList = Array.isArray(books.content) ? books.content : books;
    let filteredBooks = [...bookList];

    if (filterBy !== "all") {
      filteredBooks = filteredBooks.filter((book) => {
        return book.category === filterBy || book.genre === filterBy;
      });
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(lowerSearch)
      );
    }

    filteredBooks.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);

        case "rating":
          return (b.rating || 0) - (a.rating || 0);

        case "date":
          const dateA = new Date(a.publishedDate || a.date || 0);
          const dateB = new Date(b.publishedDate || b.date || 0);
          return dateB - dateA;

        default:
          return 0;
      }
    });

    return filteredBooks;
  }, [books, sortBy, filterBy, searchTerm]);

  

  const totalBooks = filteredAndSortedBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredAndSortedBooks.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            All Books ({totalBooks})
          </h1>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Book search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            />
          </div>

          <div className="flex space-x-4">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border bg-white border-gray-100 rounded-lg focus:outline-none focus:border-yellow-400"
            >
              <option value="title">Order By Name</option>
              <option value="rating">Order By Rating</option>
              <option value="date">Order By Date</option>
            </select>

          </div>
        </div>

        <div className="grid gap-6">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <BookCard key={book.id} book={book} size="large" />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No books found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-yellow-400"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;

              const shouldShow =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 &&
                  pageNumber <= currentPage + 1);

              if (!shouldShow) {
                if (
                  (pageNumber === currentPage - 2 && currentPage > 3) ||
                  (pageNumber === currentPage + 2 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNumber} className="px-2 py-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg border ${
                    isCurrentPage
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-yellow-400"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-yellow-400"
              }`}
            >
              Next
            </button>
          </div>
        )}
        {totalBooks > 0 && (
          <div className="text-center mt-4 text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, totalBooks)} of{" "}
            {totalBooks} books
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
