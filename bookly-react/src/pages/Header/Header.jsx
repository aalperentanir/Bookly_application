import { BookOpen, Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "../UserDetails/UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "@/State/Auth/Action";
import { searchBooks } from "@/State/Book/Action";

const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {auth} = useSelector(store => store)
  const user = auth.user;
  console.log('user',user)
  
  useEffect(() => {
    if (auth.jwt) {
        dispatch(getUser(auth.jwt));
    }
}, [auth.jwt]);

  const handleSearch = (e) => {
    e.preventDefault();
if (searchQuery.trim()) {
    navigate(`/search?q=${searchQuery.trim()}`);
    setSearchQuery("");
    setIsMenuOpen(false);
  }
  };

  const handleLogout = () => {
    dispatch(logout())
    setIsUserMenuOpen(false);
    navigate('/login')
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold bg-yellow-400 text-black px-4 py-2 rounded-lg">
              Bookly
            </span>
          </a>

          <div
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Book, author, category search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/readinglist" className="hover:text-yellow-400 transition-colors">
              Reading List
            </a>
            <a
              href="/books"
              className="hover:text-yellow-400 transition-colors"
            >
              Books
            </a>
            <a
              href="/authors"
              className="hover:text-yellow-400 transition-colors"
            >
              Authors
            </a>
            <a
              href="/categories"
              className="hover:text-yellow-400 transition-colors"
            >
              Categories
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {user.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:block">{user.username}</span>
                </button>
                
                {isUserMenuOpen && (
                  <UserDetails
                    user={user}
                    onClose={() => setIsUserMenuOpen(false)}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Login
              </a>
            )}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Book, author, category search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className="py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/books"
                className="py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </a>
              <a
                href="/authors"
                className="py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Authors
              </a>
              <a
                href="/categories"
                className="py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </a>
              
              {user.isLoggedIn ? (
                <>
                  <div className="py-2 border-t border-gray-700 mt-2">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="py-2 hover:text-yellow-400 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 hover:text-red-400 flex items-center space-x-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="py-2 hover:text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </a>
              )}
            </nav>
          </div>
        )}
        
        {isUserMenuOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsUserMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
