import { mockReviews } from "@/config/mockData";
import { Book, Plus, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UpdateBookModal from "../Modal/UpdateBookModal";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "@/State/Book/Action";
import { createReview, getReviewsByBook } from "@/State/Review/Action";
import {
  addBookToReadingList,
  getUserReadingList,
} from "@/State/Readinglist/Action";
const StarRating = ({ rating, size = "w-5 h-5" }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const RatingModal = ({ isOpen, onClose, book }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Lütfen bir puan verin");
      return;
    }

    if (comment.trim() === "") {
      alert("Lütfen bir yorum yazın");
      return;
    }

    dispatch(createReview(book.id, { rating, comment }));

    console.log("Review submitted:", {
      rating,
      comment,
      bookId: book.id,
    });

    setRating(0);
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Rate And Review Book
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">{book.title}</h4>
          <p className="text-sm text-gray-600">
            {book.authors.map((author) => author.name).join(", ")}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Rating: <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none bg-white"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">{rating} / 5 stars</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Review: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this book..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
              rows="6"
              maxLength="1000"
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/1000 characters
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookDetails = () => {
  const { auth } = useSelector((store) => store);
  const { books } = useSelector((state) => state.book);
  const { reviews } = useSelector((state) => state.review);

  const { userLists } = useSelector((state) => state.readinglist);

  const readingListId = userLists?.[0]?.id;

  const dispatch = useDispatch();
  const [currentBook, setCurrentBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdateModelOpen, setIsUpdateModalOpen] = useState(false);
  const { id } = useParams();
  const bookList = Array.isArray(books.content) ? books.content : books;
  const reviewList = Array.isArray(reviews.content) ? reviews.content : reviews;
  const book = bookList.find((b) => b.id === parseInt(id));
  const bookReviews = reviewList.filter((r) => r.bookId === parseInt(id));
  const userReview = bookReviews.find((r) => r.userId === auth.user?.id);
  console.log("userReview", userReview);

  const { selectedBook, loading } = useSelector((state) => state.book);

  console.log("selectedBook", selectedBook);

  const handleAddToReadingList = () => {
    if (!readingListId) {
      alert("Reading list not found.");
      return;
    }
    dispatch(addBookToReadingList(readingListId, book.id));
  };

  useEffect(() => {
    dispatch(getBookById(id));
    dispatch(getReviewsByBook(id));
    dispatch(getUserReadingList());
  }, [dispatch, id]);

  const isAdmin = () => {
    const userRole = auth.user?.role;
    return userRole === "ADMIN";
  };

  if (loading || !selectedBook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Book not found
          </h1>
          <Link to="/books" className="text-blue-600 hover:underline">
            Back to books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <img
                src={selectedBook.coverImageUrl}
                alt={selectedBook.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />

              <div className="mt-6 space-y-3">
                {userReview ? (
                  <div className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg text-center font-semibold flex items-center justify-center gap-2">
                    <span>Your Rating:</span>
                    <StarRating rating={userReview.rating} size="w-5 h-5" />
                   
                  </div>
                ) : (
                  <button
                    onClick={() => setIsRatingModalOpen(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <Star className="w-5 h-5 inline mr-2" />
                    Rate
                  </button>
                )}

                <button
                  onClick={handleAddToReadingList}
                  className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                >
                  <BookmarkAddIcon className="w-5 h-5 inline mr-2" />
                  Add to Readinglist
                </button>

                {isAdmin() && (
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                  >
                    <EditIcon className="w-5 h-5 inline mr-2" />
                    Update Book
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedBook.title}
              </h1>

              <div className="flex items-center mb-4">
                <span className="text-lg text-gray-600 mr-4">
                  {selectedBook.authors.map((author) => author.name).join(", ")}
                </span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-2 text-black">
                  {selectedBook.averageRating}
                </span>
                <span className="ml-2 text-gray-600">
                  ({selectedBook.ratingCount} reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-500">Publication Date:</span>
                  <p className="font-semibold">
                    {new Date(selectedBook.publicationDate).getFullYear()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Page Count:</span>
                  <p className="font-semibold">{selectedBook.pageCount}</p>
                </div>
                <div>
                  <span className="text-gray-500">ISBN:</span>
                  <p className="font-semibold">{selectedBook.isbn}</p>
                </div>
                <div>
                  <span className="text-gray-500">Publisher:</span>
                  <p className="font-semibold">{selectedBook.publisher.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBook.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedBook.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

            <div className="space-y-6">
              {bookReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold mr-3">
                        {review.firstName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.firstName} {review.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          @{review.username}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StarRating rating={review.rating} size="w-4 h-4" />
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        book={selectedBook}
      />

      <UpdateBookModal
        isOpen={isUpdateModelOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default BookDetails;
