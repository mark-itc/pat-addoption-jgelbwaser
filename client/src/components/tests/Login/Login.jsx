import "./Login.css";
import { useEffect, useState } from "react";
import { axiosJWT, axiosInstance } from '../../../lib/axios'
import UseApi from "../../../services/useApi";
import { useSelector} from 'react-redux'

function Login() {
  
  const authState = useSelector(state => state.auth);
  const {login, checkAuth} = UseApi()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Allow to clear the errors locally on Form onChange
  const [error, setError] = useState("");
  const handleFormChange = () => setError(null)
  useEffect(() => {setError(authState.error)}, [authState.error])


  const api_url = process.env.REACT_APP_API_URL

  // const handleApiError = (error) => {
  //   const errorMsg = error.response?.data?.error || error.message;
  //   console.log(errorMsg)
  //   setError(errorMsg)
  // }

  // const getRefreshToken = async () => {
  //   try {
  //     const res = await axios.post(api_url + "/refresh", { token: user.refreshToken });
  //     setUser({
  //       ...user,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const axiosJWTLocal = axios.create()

  // axiosJWTLocal.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(user.accessToken);
  //     console.log('decodedToken', decodedToken)
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers["authorization"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
      login({ email, password });
  };
  
  // const handleDelete = async (id) => {
  //   setSuccess(false);
  //   setError(false);
  //   try {
  //     await axiosJWT.delete(api_url + "/users/" + id, {
  //       headers: { authorization: "Bearer " + authState.accessToken },
  //     });
  //     setSuccess(true);
  //   } catch (err) {
  //     setError(true);
  //   }
  // };

  return (
    <div className="container">
      {false ? ( null

        // <div className="home">

        //   <span>
        //     Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
        //     <b>{user.username}</b>.
        //   </span>
        //   <span>Delete Users:</span>
        //   <button className="deleteButton" onClick={() => handleDelete(1)}>
        //     Delete John
        //   </button>
        //   <button className="deleteButton" onClick={() => handleDelete(2)}>
        //     Delete Jane
        //   </button>
        //   {error && (
        //     <span className="error">
        //       You are not allowed to delete this user!
       
       
      ) : (
        <div className="login">
          <div>
            <button onClick={checkAuth}>CheckAuth</button>
          </div>
          <form onSubmit={handleSubmit} onChange={handleFormChange}>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
          <div>
          {authState.loading && "Loading..."}
          {authState.isLoggedIn && `${authState.currentUser.firstName} is logged in`}
          {error && error}
          </div>

        </div>
      )}
    </div>
  );
}

export default Login;