import axios from "axios";
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

const BASE_URL = "http://localhost:8080/api/reading-lists";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export const getUserReadingList = () => async(dispatch) =>{
    dispatch({type:GET_USER_READING_LISTS_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}/user`, authHeader())
        console.log("getUserReadingList",res)
        dispatch({type:GET_USER_READING_LISTS_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({ type: GET_USER_READING_LISTS_FAILURE, payload: error.message });
        console.log("error", error)
    }
}


export const getPublicReadingLists = () => async (dispatch) => {
  dispatch({ type: GET_PUBLIC_READING_LISTS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/public`, authHeader());
    console.log("getPublicReadingLists",response)
    dispatch({ type: GET_PUBLIC_READING_LISTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PUBLIC_READING_LISTS_FAILURE, payload: error.message });
    console.log("error", error)
  }
};

export const createReadingList = (data) => async (dispatch) => {
  dispatch({ type: CREATE_READING_LIST_REQUEST });
  try {
    const response = await axios.post(BASE_URL, authHeader());
    console.log("createReadingList",response)
    dispatch({ type: CREATE_READING_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_READING_LIST_FAILURE, payload: error.message });
    console.log("error", error)
  }
};

export const updateReadingList = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_READING_LIST_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.put(`${BASE_URL}/${id}`, data, authHeader());
    console.log("updateReadingList",response)
    dispatch({ type: UPDATE_READING_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_READING_LIST_FAILURE, payload: error.message });
    console.log("error", error)
  }
};

export const deleteReadingList = (id) => async (dispatch) => {
  dispatch({ type: DELETE_READING_LIST_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${BASE_URL}/${id}`, authHeader());
    dispatch({ type: DELETE_READING_LIST_SUCCESS, payload: id });
    console.log("deleteReadingList",response)
  } catch (error) {
    dispatch({ type: DELETE_READING_LIST_FAILURE, payload: error.message });
    console.log("error", error)
  }
};

export const addBookToReadingList = (listId, bookId) => async (dispatch) => {
  dispatch({ type: ADD_BOOK_TO_LIST_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(`${BASE_URL}/${listId}/books/${bookId}`, null, authHeader());
    console.log("addBookToReadingList",response)
    dispatch({ type: ADD_BOOK_TO_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_BOOK_TO_LIST_FAILURE, payload: error.message });
    console.log("error", error)
  }
};

export const removeBookFromReadingList = (listId, bookId) => async (dispatch) => {
  dispatch({ type: REMOVE_BOOK_FROM_LIST_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete(`${BASE_URL}/${listId}/books/${bookId}`, authHeader());
    console.log("removeBookFromReadingList",response)
    dispatch({ type: REMOVE_BOOK_FROM_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REMOVE_BOOK_FROM_LIST_FAILURE, payload: error.message });
    console.log("error", error)
  }
};