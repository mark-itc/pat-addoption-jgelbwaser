import axios from "axios";
import jwt_decode from "jwt-decode";
import  store  from './../redux/store'
import {setTokens} from './../redux/reducers/authSlice'
import {setAppError} from './../redux/reducers/appSlice'

 const api_url = process.env.REACT_APP_API_URL
 const axiosAuthCall = axios.create()
 const axiosCall = axios.create()

axiosAuthCall.interceptors.request.use(
    async (config) => {
    console.log('axiosJWT.interceptors')
    console.log('====================')
    let currentDate = new Date();
    const currentAccessToken =  store.getState().auth.accessToken;
    console.log('currentAccessToken', currentAccessToken)
    const decodedToken = jwt_decode(currentAccessToken);
    console.log('decodedToken', decodedToken)
    
    //if access token expired refresh token
    if (!decodedToken?.exp || decodedToken.exp * 1000 < currentDate.getTime()) {
        await RefreshToken();
      }
      const updatedAccessToken =  store.getState().auth.accessToken;
      config.headers["authorization"] = "Bearer " + updatedAccessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const RefreshToken = async () => {
    const {refreshToken} =  store.getState().auth;
    if(!refreshToken) {
        throw new Error('Refresh token is missing')
    }
    try {
      const res = await axiosCall.post(api_url + "/refresh", { token: refreshToken });
      console.log('freshToken res', res);
      store.dispatch(setTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }))
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.error || error.message;
      setAppError(errorMsg)
    }
  };

export {axiosAuthCall , axiosCall}