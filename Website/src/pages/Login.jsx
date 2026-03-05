import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok) {

        dispatch(login(data));

        navigate("/home");

      } else {
        alert("Invalid Username or Password");
      }

    } catch (error) {
      console.log(error);
      alert("Login failed");
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

        <button className="btn">Login</button>

      </form>
    </div>
  );
}

export default Login;