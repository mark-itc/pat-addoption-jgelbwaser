import axios from "axios";
import jwt_decode from "jwt-decode";
import  store  from './../redux/store'

console.log('axios.js called');
 const {accessToken, refreshToken} =  store.getState().auth;
 const api_url = process.env.REACT_APP_API_URL
 

 const axiosJWT = axios.create()
 const axiosInstance = axios.create()

axiosJWT.interceptors.request.use(
  async (config) => {
    const {accessToken} =  store.getState().auth;
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await getRefreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getRefreshToken = async () => {
    const {refreshToken} =  store.getState().auth;
    try {
      const res = await axiosInstance.post(api_url + "/refresh", { token: refreshToken });
      console.log('getRefreshToken res', res)
      //   setUser({
    //     ...user,
    //     accessToken: res.data.accessToken,
    //     refreshToken: res.data.refreshToken,
    //   });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

export {axiosJWT , axiosInstance, accessToken, refreshToken}