import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  SEARCH_CATEGORY_REQUEST,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILURE,
  GET_POPULAR_CATEGORIES_REQUEST,
  GET_POPULAR_CATEGORIES_SUCCESS,
  GET_POPULAR_CATEGORIES_FAILURE,
} from "./ActionType";

const initialState = {
    loading:false,
    error:null,
    categories:[],
    category:null,
    popularCategories:[],
    searchResults:[]
}

const categoryReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
        case SEARCH_CATEGORY_REQUEST:
        case GET_CATEGORY_BY_ID_REQUEST:
        case GET_POPULAR_CATEGORIES_REQUEST:
            return {...state, loading:true, error:null}
        
        case GET_ALL_CATEGORIES_SUCCESS:
            return {...state, loading:false, categories:action.payload}

        case GET_CATEGORY_BY_ID_SUCCESS:
            return {...state, loading:false, category:action.payload}

        case SEARCH_CATEGORY_SUCCESS:
            return {...state, loading:false, searchResults:action.payload}

        case GET_POPULAR_CATEGORIES_SUCCESS:
            return {...state, loading:false, popularCategories:action.payload}
        
        case GET_ALL_CATEGORIES_FAILURE:
        case GET_POPULAR_CATEGORIES_FAILURE:
        case SEARCH_CATEGORY_FAILURE:
        case GET_CATEGORY_BY_ID_FAILURE:
        case GET_ALL_CATEGORIES_FAILURE:
            return {...state, loading:false, error:action.payload}    
        default:
            return state;
    }
}

export default categoryReducer;