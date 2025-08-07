import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Grid, List } from 'lucide-react';
import BookCard from '../BookCard/BookCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById } from '@/State/Category/Action';
import { mockBooks } from '@/config/mockData';
import { getBooksByCategory } from '@/State/Book/Action';

const CategoryBooks = () => {
  const { id: categoryId } = useParams();
  const dispatch = useDispatch();

    const { category, loading: categoryLoading } = useSelector((state) => state.category);
  const { books, loading: booksLoading } = useSelector((state) => state.book);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [filterRating, setFilterRating] = useState('all');
  const bookList = Array.isArray(books.content) ? books.content : books;

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryById(categoryId));
      dispatch(getBooksByCategory(categoryId))
    }
  }, [categoryId, dispatch]);


const filteredAndSortedBooks = bookList
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some((author) =>
          author.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesRating =
        filterRating === 'all' ||
        (filterRating === '4+' && book.averageRating >= 4) ||
        (filterRating === '4.5+' && book.averageRating >= 4.5);

      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'year':
          return new Date(b.publicationDate) - new Date(a.publicationDate);
        case 'pages':
          return a.pageCount - b.pageCount;
        default:
          return 0;
      }
    });

  if (categoryLoading || booksLoading  || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category and books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{category.description}</p>
          <div className="flex items-center text-gray-500">
            <BookOpen className="w-5 h-5 mr-2" />
            <span>{filteredAndSortedBooks.length} books found</span>
          </div>
        </div>

        {/* Filter/Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Book or author search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-yellow-500' : 'text-yellow-500 hover:text-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-yellow-500' : 'text-yellow-500 hover:text-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sort and Rating Filter */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="title">Alphabetical</option>
                <option value="rating">By score</option>
                <option value="year">By publication year</option>
                <option value="pages">By number of pages</option>
              </select>
            </div>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Stars</option>
              <option value="4+">4+ star</option>
              <option value="4.5+">4.5+ star</option>
            </select>
          </div>
        </div>

        {/* Book List */}
        {filteredAndSortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'Search results not found' : 'There are no books in this category yet.'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try different keywords.' : 'New books will be added soon.'}
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
            {filteredAndSortedBooks.map((book) => (
              <BookCard key={book.id} book={book} size={viewMode === 'list' ? 'large' : 'normal'} />
            ))}
          </div>
        )}

        {/* Footer Info */}
        {filteredAndSortedBooks.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            {filteredAndSortedBooks.length} books found
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBooks;
