import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(res.data);

      dispatch(login(res.data));

      navigate("/home");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="auth-box">

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;