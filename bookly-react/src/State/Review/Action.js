// Action.js
import axios from "axios";
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

const BASE_URL = "http://localhost:8080/api/reviews";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});
export const getReviewsByBook = (bookId, page = 0, size = 10) => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_BY_BOOK_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/book/${bookId}?page=${page}&size=${size}`, authHeader());
    console.log("getReviewsByBook",data)
    dispatch({ type: GET_REVIEWS_BY_BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REVIEWS_BY_BOOK_FAILURE, payload: error.message });
  }
};

export const getReviewsByUser = () => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_BY_USER_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/user`, authHeader());
    dispatch({ type: GET_REVIEWS_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REVIEWS_BY_USER_FAILURE, payload: error.message });
  }
};

export const createReview = (bookId, review) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/book/${bookId}`, review, authHeader());
    console.log("createReview",data)
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const updateReview = (reviewId, review) => async (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await axios.put(`${BASE_URL}/${reviewId}`, review,authHeader());
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    await axios.delete(`${BASE_URL}/${reviewId}`,authHeader());
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
  }
};

export const getRecentReviews = () => async (dispatch) => {
  dispatch({ type: GET_RECENT_REVIEWS_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/recent`, authHeader());
    dispatch({ type: GET_RECENT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RECENT_REVIEWS_FAILURE, payload: error.message });
  }
};
