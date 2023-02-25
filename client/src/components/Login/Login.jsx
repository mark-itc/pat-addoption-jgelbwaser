import "./Login.css";
import { useState } from "react";
import { axiosJWT, axiosInstance, refreshToken, accessToken } from '../../lib/axios'
import UseApi from "../../services/useApi";
import { useSelector} from 'react-redux'

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const auth = useSelector(state => state.auth);
  console.log('AUTH',auth);
  const {login} = UseApi()

  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  const api_url = process.env.REACT_APP_API_URL

  const handleApiError = (error) => {
    const errorMsg = error.response?.data?.error || error.message;
    console.log(errorMsg)
    setError(errorMsg)
  }

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
    try {
      login({ email, password });
      // const res = await axios.post(api_url + "/login", { email, password });
      // setUser(res.data);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosJWT.delete(api_url + "/users/" + id, {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="container">
      {user ? (

        <div className="home">

          <span>
            Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.username}</b>.
          </span>
          <span>Delete Users:</span>
          <button className="deleteButton" onClick={() => handleDelete(1)}>
            Delete John
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
            Delete Jane
          </button>
          {error && (
            <span className="error">
              You are not allowed to delete this user!
            </span>
          )}
          {success && (
            <span className="success">
              User has been deleted successfully...
            </span>
          )}
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit} onChange={() => { setError(null) }}>
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
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;