import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Star,
  Filter,
  Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserReadingList,
  removeBookFromReadingList,
} from "@/State/Readinglist/Action";
import { useNavigate, useParams } from "react-router-dom";

const ReadingList = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id", id);

  const { userLists, loading } = useSelector((state) => state.readinglist);

  const readingListId = userLists?.[0]?.id;
  const books = userLists?.[0]?.books || [];
  console.log("books", books);

  useEffect(() => {
    dispatch(getUserReadingList());
  }, [dispatch]);

  const tabs = [{ id: "all", label: "All Books", icon: BookOpen }];

  const removeFromList = (readingListId, bookId) => {
    dispatch(removeBookFromReadingList(readingListId, bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTab = activeTab === "all" || book.status === activeTab;
    const authorsStr =
      book.authors
        ?.map((a) => a.name)
        .join(" ")
        .toLowerCase() || "";
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorsStr.includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  console.log("filteredBooks", filteredBooks);

  const renderStarRating = (bookId, currentRating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => updateRating(bookId, star)}
            className="hover:scale-110 transition-transform bg-white"
          >
            <Star
              className={`w-4 h-4 ${
                star <= (currentRating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getStatsForTab = (tabId) => {
    if (tabId === "all") return books.length;
    return books.filter((book) => book.status === tabId).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Reading List
        </h1>
        <p className="text-gray-600">
          Track your reading journey and discover new books
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 bg-w" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
            >
              <option value="dateAdded">Date Added</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const count = getStatsForTab(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 bg-white font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-yellow-500 text-yellow-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBooks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start building your reading list!"}
            </p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-24 h-32 bg-gradient-to-br from-yellow-400 to-gray-900 rounded-lg shadow-md overflow-hidden">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background =
                          "linear-gradient(to bottom right, #facc15, #111827)";
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600">
                        {book.authors.map((author) => author.name).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromList(readingListId, book.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors bg-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{book.pageCount} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Added {new Date(book.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                    {book.dateFinished && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          Finished{" "}
                          {new Date(book.dateFinished).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReadingList;
