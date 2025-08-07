import axios from "axios";
import {
  GET_ALL_BOOKS_REQUEST, GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAILURE,
  CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAILURE,
  SEARCH_BOOKS_REQUEST, SEARCH_BOOKS_SUCCESS, SEARCH_BOOKS_FAILURE,
  GET_TOP_RATED_BOOKS_REQUEST, GET_TOP_RATED_BOOKS_SUCCESS, GET_TOP_RATED_BOOKS_FAILURE,
  GET_MOST_REVIEWED_BOOKS_REQUEST, GET_MOST_REVIEWED_BOOKS_SUCCESS, GET_MOST_REVIEWED_BOOKS_FAILURE,
  GET_BOOKS_BY_AUTHOR_REQUEST, GET_BOOKS_BY_AUTHOR_SUCCESS, GET_BOOKS_BY_AUTHOR_FAILURE,
  GET_BOOKS_BY_CATEGORY_REQUEST, GET_BOOKS_BY_CATEGORY_SUCCESS, GET_BOOKS_BY_CATEGORY_FAILURE,
} from "./ActionType";


const BASE_URL = "http://localhost:8080/api";
const ADMIN_URL = "http://localhost:8080/api/admin";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export const getAllBooks = (page=0, size=30) => async(dispatch) =>{
    dispatch({type:GET_ALL_BOOKS_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}/books?page=${page}&size=${size}`, authHeader())
        console.log("getAllBooks", res)
        dispatch({type:GET_ALL_BOOKS_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: GET_ALL_BOOKS_FAILURE, payload: err.message });
    }
}

export const getBookById = (id) => async(dispatch) =>{
    dispatch({type:GET_BOOK_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}/books/${id}`, authHeader())
        console.log("getBookById", res)
        dispatch({type:GET_BOOK_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: GET_BOOK_FAILURE, payload: err.message });
    }
}

export const createBook = (bookData) => async(dispatch) =>{
    dispatch({type:CREATE_BOOK_REQUEST})

    try {
        const res = await axios.post(`${ADMIN_URL}/books`,bookData, authHeader())
        console.log("createBook", res)
        dispatch({type:CREATE_BOOK_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: CREATE_BOOK_FAILURE, payload: err.message });
    }
}

export const updateBook = (id,bookData) => async(dispatch) =>{
    dispatch({type:UPDATE_BOOK_REQUEST})

    try {
        const res = await axios.put(`${ADMIN_URL}/books/${id}`,bookData, authHeader())
        console.log("updateBook", res)
        dispatch({type:UPDATE_BOOK_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: UPDATE_BOOK_FAILURE, payload: err.message });
    }
}

export const deleteBook = (id) => async(dispatch) =>{
    dispatch({type:DELETE_BOOK_REQUEST })

    try {
        const res = await axios.delete(`${ADMIN_URL}/books/${id}`, authHeader())
        console.log("deleteBook", id)
        dispatch({type:DELETE_BOOK_SUCCESS, payload: id})
    } catch (err) {
        dispatch({ type: DELETE_BOOK_FAILURE, payload: err.message });
    }
}


export const searchBooks = (keyword, page = 0, size = 30) => async(dispatch) =>{
    dispatch({type:SEARCH_BOOKS_REQUEST  })

    try {
        const res = await axios.get(`${BASE_URL}/books/search?keyword=${keyword}&page=${page}&size=${size}`, authHeader())
        console.log("searchBook", res)
        dispatch({type:SEARCH_BOOKS_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: SEARCH_BOOKS_FAILURE, payload: err.message });
    }
}

export const getTopRatedBooks = (minRating = 4.0, limit = 10) => async(dispatch) =>{
    dispatch({type:GET_TOP_RATED_BOOKS_REQUEST   })

    try {
        const res = await axios.get(`${BASE_URL}/books/top-rated?minRating=${minRating}&limit=${limit}`, authHeader())
        console.log("getTopRatedBooks", res)
        dispatch({type:GET_TOP_RATED_BOOKS_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: GET_TOP_RATED_BOOKS_FAILURE, payload: err.message });
    }
}

export const getMostReviewedBooks = (limit = 10) => async(dispatch) =>{
    dispatch({type:GET_MOST_REVIEWED_BOOKS_REQUEST    })

    try {
        const res = await axios.get(`${BASE_URL}/books/most-reviewed?limit=${limit}`, authHeader())
        console.log("getMostReviewedBooks", res)
        dispatch({type:GET_MOST_REVIEWED_BOOKS_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: GET_MOST_REVIEWED_BOOKS_FAILURE, payload: err.message });
    }
}

export const getBooksByAuthor  = (authorId) => async(dispatch) =>{
    dispatch({type:GET_BOOKS_BY_AUTHOR_REQUEST     })

    try {
        const res = await axios.get(`${BASE_URL}/books/author/${authorId}`, authHeader())
        console.log("getBooksByAuthor", res)
        dispatch({type:GET_BOOKS_BY_AUTHOR_SUCCESS, payload: res.data})
    } catch (err) {
        dispatch({ type: GET_BOOKS_BY_AUTHOR_FAILURE, payload: err.message });
    }
}

export const getBooksByCategory = (categoryId, page = 0, size = 30) => async (dispatch) => {
  dispatch({ type: GET_BOOKS_BY_CATEGORY_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/books/category/${categoryId}?page=${page}&size=${size}`, authHeader());
    console.log("getBooksByCategory", res)
    dispatch({ type: GET_BOOKS_BY_CATEGORY_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_BOOKS_BY_CATEGORY_FAILURE, payload: err.message });
  }
};