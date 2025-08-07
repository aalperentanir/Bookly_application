import { BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">Bookly</span>
            </div>
            <p className="text-gray-300 mb-4">
              The platform where book lovers meet. Millions of books, authors,
              and reviews.
            </p>
          </div>

          <div className="">
            <h4 className="text-lg font-semibold mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/authors"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  New Releases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  My Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  My Reading Lists
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Destek</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2025 BookLY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
