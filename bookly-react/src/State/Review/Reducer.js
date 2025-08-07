// Reducer.js
import {
  GET_REVIEWS_BY_BOOK_REQUEST,
  GET_REVIEWS_BY_BOOK_SUCCESS,
  GET_REVIEWS_BY_BOOK_FAILURE,
  GET_REVIEWS_BY_USER_REQUEST,
  GET_REVIEWS_BY_USER_SUCCESS,
  GET_REVIEWS_BY_USER_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  GET_RECENT_REVIEWS_REQUEST,
  GET_RECENT_REVIEWS_SUCCESS,
  GET_RECENT_REVIEWS_FAILURE,
} from "./ActionTypes";

const initialState = {
  reviews: [],
  recent: [],
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_BOOK_REQUEST:
    case GET_REVIEWS_BY_USER_REQUEST:
    case CREATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
    case GET_RECENT_REVIEWS_REQUEST:
      return { ...state, loading: true };

    case GET_REVIEWS_BY_BOOK_SUCCESS:
    case GET_REVIEWS_BY_USER_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };

    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: [...state.reviews, action.payload] };

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((rev) =>
          rev.id === action.payload.id ? action.payload : rev
        ),
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.filter((rev) => rev.id !== action.payload),
      };

    case GET_RECENT_REVIEWS_SUCCESS:
      return { ...state, loading: false, recent: action.payload };

    case GET_REVIEWS_BY_BOOK_FAILURE:
    case GET_REVIEWS_BY_USER_FAILURE:
    case CREATE_REVIEW_FAILURE:
    case UPDATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
    case GET_RECENT_REVIEWS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default reviewReducer;