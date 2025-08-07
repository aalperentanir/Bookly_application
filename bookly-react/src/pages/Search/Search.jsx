import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "@/State/Book/Action";

const Search = () => {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const dispatch = useDispatch();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  const { books } = useSelector((state) => state.book);
  const bookList = Array.isArray(books.content) ? books.content : [];

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchBooks(query));
    }
  }, [dispatch, query]);

  useEffect(() => {
    if (query.trim()) {
      setResults(bookList);
    } else {
      setResults(bookList);
    }
  }, [books, query]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {query && (
              <>
                "<span className="font-semibold">{query}</span>" for{" "}
              </>
            )}
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid gap-6">
          {results.map((book) => (
            <BookCard key={book.id} book={book} size="large" />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 mb-4">
              {query ? (
                <>Try different keywords or check your spelling.</>
              ) : (
                <>Enter a search term to find books.</>
              )}
            </p>
            <Link to="/books" className="text-blue-600 hover:underline">
              View all books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
