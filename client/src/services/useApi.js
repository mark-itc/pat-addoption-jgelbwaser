import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  startApiCall, setLogoutState, setLoginState,
  setErrorState, setLoadingFalse
} from '../redux/reducers/authSlice';
import { axiosAuthCall, axiosCall } from '../lib/axios'


export default function UseApi() {


  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const api_url = process.env.REACT_APP_API_URL

  const handleApiError = (error) => {
    if(error.response?.data?.logOut === true) {
      dispatch(setLogoutState());
    }
    const errorMsg = error.response?.data?.error || error.message;
    dispatch(setErrorState(errorMsg))
    console.log(error);
  }

  const login = async ({ email, password }) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/login", { email, password });
      const {accessToken, refreshToken, currentUser} = res.data
      dispatch(setLoginState({accessToken, refreshToken, currentUser}))
    } catch (error) {
      handleApiError(error)
    }
  }

  const signIn = async (newUserData) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/register", newUserData );
      const {accessToken, refreshToken, currentUser} = res.data
      dispatch(setLoginState({accessToken, refreshToken, currentUser}))
    } catch (error) {
      handleApiError(error)
    }
  }

  const checkAuth = async() => {
    dispatch(startApiCall())
    try {
      const res = await axiosAuthCall.get(api_url + "/auth", {});
      console.log('checkAuth tokenDecoded', res.data)
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }

  }

  


  return (
    { login, checkAuth, signIn }
  )
}
