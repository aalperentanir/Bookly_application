import {
  GET_USER_READING_LISTS_REQUEST,
  GET_USER_READING_LISTS_SUCCESS,
  GET_USER_READING_LISTS_FAILURE,
  GET_PUBLIC_READING_LISTS_REQUEST,
  GET_PUBLIC_READING_LISTS_SUCCESS,
  GET_PUBLIC_READING_LISTS_FAILURE,
  CREATE_READING_LIST_REQUEST,
  CREATE_READING_LIST_SUCCESS,
  CREATE_READING_LIST_FAILURE,
  UPDATE_READING_LIST_REQUEST,
  UPDATE_READING_LIST_SUCCESS,
  UPDATE_READING_LIST_FAILURE,
  DELETE_READING_LIST_REQUEST,
  DELETE_READING_LIST_SUCCESS,
  DELETE_READING_LIST_FAILURE,
  ADD_BOOK_TO_LIST_REQUEST,
  ADD_BOOK_TO_LIST_SUCCESS,
  ADD_BOOK_TO_LIST_FAILURE,
  REMOVE_BOOK_FROM_LIST_REQUEST,
  REMOVE_BOOK_FROM_LIST_SUCCESS,
  REMOVE_BOOK_FROM_LIST_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  userLists: [],
  publicLists: [],
};

const readingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_READING_LISTS_REQUEST:
    case GET_PUBLIC_READING_LISTS_REQUEST:
    case CREATE_READING_LIST_REQUEST:
    case UPDATE_READING_LIST_REQUEST:
    case DELETE_READING_LIST_REQUEST:
    case ADD_BOOK_TO_LIST_REQUEST:
    case REMOVE_BOOK_FROM_LIST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_READING_LISTS_SUCCESS:
      return { ...state, loading: false, userLists: action.payload };

    case GET_PUBLIC_READING_LISTS_SUCCESS:
      return { ...state, loading: false, publicLists: action.payload };

    case CREATE_READING_LIST_SUCCESS:
      return { ...state, loading: false, userLists: [...state.userLists, action.payload] };

    case UPDATE_READING_LIST_SUCCESS:
    case ADD_BOOK_TO_LIST_SUCCESS:
    case REMOVE_BOOK_FROM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userLists: state.userLists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };

    case DELETE_READING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userLists: state.userLists.filter((list) => list.id !== action.payload),
      };

    case GET_USER_READING_LISTS_FAILURE:
    case GET_PUBLIC_READING_LISTS_FAILURE:
    case CREATE_READING_LIST_FAILURE:
    case UPDATE_READING_LIST_FAILURE:
    case DELETE_READING_LIST_FAILURE:
    case ADD_BOOK_TO_LIST_FAILURE:
    case REMOVE_BOOK_FROM_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default readingListReducer;
