import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  SEARCH_BOOKS_REQUEST,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE,
  GET_TOP_RATED_BOOKS_REQUEST,
  GET_TOP_RATED_BOOKS_SUCCESS,
  GET_TOP_RATED_BOOKS_FAILURE,
  GET_MOST_REVIEWED_BOOKS_REQUEST,
  GET_MOST_REVIEWED_BOOKS_SUCCESS,
  GET_MOST_REVIEWED_BOOKS_FAILURE,
  GET_BOOKS_BY_AUTHOR_REQUEST,
  GET_BOOKS_BY_AUTHOR_SUCCESS,
  GET_BOOKS_BY_AUTHOR_FAILURE,
  GET_BOOKS_BY_CATEGORY_REQUEST,
  GET_BOOKS_BY_CATEGORY_SUCCESS,
  GET_BOOKS_BY_CATEGORY_FAILURE,
} from "./ActionType";

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
  selectedBook:null
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
    case GET_BOOK_REQUEST:
    case CREATE_BOOK_REQUEST:
    case UPDATE_BOOK_REQUEST:
    case DELETE_BOOK_REQUEST:
    case SEARCH_BOOKS_REQUEST:
    case GET_TOP_RATED_BOOKS_REQUEST:
    case GET_MOST_REVIEWED_BOOKS_REQUEST:
    case GET_BOOKS_BY_AUTHOR_REQUEST:
    case GET_BOOKS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_BOOKS_SUCCESS:
    case SEARCH_BOOKS_SUCCESS:
    case GET_TOP_RATED_BOOKS_SUCCESS:
    case GET_MOST_REVIEWED_BOOKS_SUCCESS:
    case GET_BOOKS_BY_AUTHOR_SUCCESS:
    case GET_BOOKS_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, books: action.payload };

    case GET_BOOK_SUCCESS:
      return {
        ...state,
        selectedBook: action.payload,
        loading: false,
      };

    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };

    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };

    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case GET_ALL_BOOKS_FAILURE:
    case GET_BOOK_FAILURE:
    case CREATE_BOOK_FAILURE:
    case UPDATE_BOOK_FAILURE:
    case DELETE_BOOK_FAILURE:
    case SEARCH_BOOKS_FAILURE:
    case GET_TOP_RATED_BOOKS_FAILURE:
    case GET_MOST_REVIEWED_BOOKS_FAILURE:
    case GET_BOOKS_BY_AUTHOR_FAILURE:
    case GET_BOOKS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
