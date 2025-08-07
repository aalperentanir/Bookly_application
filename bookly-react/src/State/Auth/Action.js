import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REEQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"


export const register = (userData) => async(dispatch) =>{
    dispatch({type:REGISTER_REQUEST})

    const base_url = "http://localhost:8080/auth"

    try{
        const response = await axios.post(`${base_url}/signup`,userData);
        const user = response.data
        //user.jwt de olabilir.
        localStorage.setItem("jwt",user.token)
        console.log("register request: ", user)
        dispatch({type:REGISTER_SUCCESS, payload:user.token})

    }catch(error){
        console.log(error);
        dispatch({type:REGISTER_FAILURE, payload:error.message})
    }
}

export const login = (userData) => async(dispatch) =>{
    dispatch({type:LOGIN_REQUEST})

    const base_url = "http://localhost:8080/auth"

    try{
        const response = await axios.post(`${base_url}/signin`,userData);
        const user = response.data
        //user.jwt de olabilir.
        localStorage.setItem("jwt",user.token)
        console.log("login request: ", user)
        dispatch({type:LOGIN_SUCCESS, payload:user.token})
        userData.navigate('/')

    }catch(error){
        dispatch({type:LOGIN_FAILURE, payload:error.message})
    }
}

export const getUser = (jwt) => async(dispatch) =>{
    dispatch({type:GET_USER_REEQUEST})

    const base_url ="http://localhost:8080/api/users";

    try{
        const response = await axios.get(`${base_url}/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })

        const user = response.data
        console.log('getUser Rqeuest',user)
        dispatch({type:GET_USER_SUCCESS, payload:user})
    }catch(error){
        console.log(error);
        dispatch({type:GET_USER_FAILURE, payload:error.message})
    }
}

export const logout = () => (dispatch) =>{
    localStorage.clear();
    dispatch({type:LOGOUT})
}