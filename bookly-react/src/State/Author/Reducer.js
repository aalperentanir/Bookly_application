import {
  GET_ALL_AUTHORS_REQUEST,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILURE,
  GET_AUTHOR_REQUEST,
  GET_AUTHOR_SUCCESS,
  GET_AUTHOR_FAILURE,
  CREATE_AUTHOR_REQUEST,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  SEARCH_AUTHORS_REQUEST,
  SEARCH_AUTHORS_SUCCESS,
  SEARCH_AUTHORS_FAILURE,
  GET_MOST_PRODUCTIVE_AUTHORS_REQUEST,
  GET_MOST_PRODUCTIVE_AUTHORS_SUCCESS,
  GET_MOST_PRODUCTIVE_AUTHORS_FAILURE,
} from "./ActionType";

const initialState = {
  authors: [],
  author: null,
  loading: false,
  error: null,
};

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS_REQUEST:
    case GET_AUTHOR_REQUEST:
    case CREATE_AUTHOR_REQUEST:
    case UPDATE_AUTHOR_REQUEST:
    case DELETE_AUTHOR_REQUEST:
    case SEARCH_AUTHORS_REQUEST:
    case GET_MOST_PRODUCTIVE_AUTHORS_REQUEST:
        return {...state, loading:true, error:null}

    case GET_ALL_AUTHORS_SUCCESS:
    case SEARCH_AUTHORS_SUCCESS:
    case GET_MOST_PRODUCTIVE_AUTHORS_SUCCESS:
        return {...state, loading:false, authors:action.payload}

    case GET_AUTHOR_SUCCESS:
        return {...state, loading:false, author:action.payload};

    case CREATE_AUTHOR_SUCCESS:
        return {...state, loading:false, authors:[...state.authors, action.payload]}

    case UPDATE_AUTHOR_SUCCESS:
        return {
        ...state,
        loading: false,
        authors: state.authors.map((author) =>
          author.id === action.payload.id ? action.payload : author
        ),
      };

    case DELETE_AUTHOR_SUCCESS:
        return {...state,loading:false,authors:state.authors.filter((author) => author.id !== action.payload)}

    case GET_ALL_AUTHORS_FAILURE:
    case GET_AUTHOR_FAILURE:
    case CREATE_AUTHOR_FAILURE:
    case UPDATE_AUTHOR_FAILURE:
    case DELETE_AUTHOR_FAILURE:
    case SEARCH_AUTHORS_FAILURE:
    case GET_MOST_PRODUCTIVE_AUTHORS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
        return state;
  }
};
export default authorReducer;