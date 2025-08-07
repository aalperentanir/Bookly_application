import axios from "axios";
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


const BASE_URL = "http://localhost:8080";

export const getAllAuthors = () => async(dispatch) =>{
    dispatch({type:GET_ALL_AUTHORS_REQUEST})
    const token = localStorage.getItem("jwt")

    try {
        const res = await axios.get(`${BASE_URL}/api/authors`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         console.log("getAllAuthors",res)
        dispatch({type:GET_ALL_AUTHORS_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: GET_ALL_AUTHORS_FAILURE, payload: err.message });
    }
}

export const getAuthorById = (id) => async(dispatch) =>{
    dispatch({type:GET_AUTHOR_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.get(`${BASE_URL}/api/authors/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log("getAuthorById",res)
        dispatch({type:GET_AUTHOR_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: GET_AUTHOR_FAILURE, payload: err.message });
    }
}


export const searchAuthors = (name) => async(dispatch) =>{
    dispatch({type:SEARCH_AUTHORS_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.get(`${BASE_URL}/api/authors/search?name=${name}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log("searchAuthors",res)
        dispatch({type:SEARCH_AUTHORS_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: SEARCH_AUTHORS_FAILURE, payload: err.message });
    }
}

export const getMostProductiveAuthors = () => async(dispatch) => {
    dispatch({type:GET_MOST_PRODUCTIVE_AUTHORS_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.get(`${BASE_URL}/api/authors/most-productive`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log("getMostProductiveAuthors",res)
        dispatch({type:GET_MOST_PRODUCTIVE_AUTHORS_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: GET_MOST_PRODUCTIVE_AUTHORS_FAILURE, payload: err.message });
    }
}

export const createAuthor = (authorData) => async(dispatch) => {
    dispatch({type:CREATE_AUTHOR_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.post(`${BASE_URL}/api/admin/authors`,authorData,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log("createAuthor", res)

        dispatch({type:CREATE_AUTHOR_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: CREATE_AUTHOR_FAILURE, payload: err.message });
    }
}

export const updateAuthor = (id,authorData) => async(dispatch) => {
    dispatch({type:UPDATE_AUTHOR_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.put(`${BASE_URL}/api/admin/authors/${id}`,authorData,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log("updateAuthor", res)

        dispatch({type:UPDATE_AUTHOR_SUCCESS, payload:res.data})
    } catch (err) {
        dispatch({ type: UPDATE_AUTHOR_FAILURE, payload: err.message });
    }
}

export const deleteAuthor = (id) => async(dispatch) => {
    dispatch({type:DELETE_AUTHOR_REQUEST})
    const token = localStorage.getItem("jwt")
    try {
        const res = await axios.delete(`${BASE_URL}/api/admin/authors/${id}`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log("deleteAuthor", res)

        dispatch({type:DELETE_AUTHOR_SUCCESS, payload:id})
    } catch (err) {
        dispatch({ type: DELETE_AUTHOR_FAILURE, payload: err.message });
    }
}