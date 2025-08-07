import axios from "axios";
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


const BASE_URL = "http://localhost:8080/api/categories";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});


export const getAllCategories = () => async(dispatch) =>{
    dispatch({type:GET_ALL_CATEGORIES_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}`, authHeader())
        console.log("getAllCategories",res)
        dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    }
}

export const getCategoryById = (id) => async(dispatch) =>{
    dispatch({type:GET_CATEGORY_BY_ID_REQUEST })

    try {
        const res = await axios.get(`${BASE_URL}/${id}`, authHeader())
        console.log("getCategoryById",res)
        dispatch({ type: GET_CATEGORY_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    }
}

export const searchCategoryByName = (name) => async(dispatch) =>{
    dispatch({type:SEARCH_CATEGORY_REQUEST  })

    try {
        const res = await axios.get(`${BASE_URL}/search?name=${name}`, authHeader())
        console.log("searchCategoryByName",res)
        dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
      type: SEARCH_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    }
}

export const getPopularCategories = () => async (dispatch) => {
  dispatch({ type: GET_POPULAR_CATEGORIES_REQUEST });

  try {
    const res = await axios.get(`${BASE_URL}/popular`, authHeader());
    console.log("getPopularCategories",res)
    dispatch({ type: GET_POPULAR_CATEGORIES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_POPULAR_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

