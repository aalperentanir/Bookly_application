import React from "react";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import BookRecommendations from "./BookRecommendations";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Your Book World</h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Millions of books, authors, and reader reviews. Discover and share
            your favorite books.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/books"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors"
            >
              Discover Books
            </Link>

            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-400 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <BookRecommendations />
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                50,000+
              </div>
              <div className="text-gray-300">Book</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                10,000+
              </div>
              <div className="text-gray-300">Author</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                100,000+
              </div>
              <div className="text-gray-300">User</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                500,000+
              </div>
              <div className="text-gray-300">Review</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
