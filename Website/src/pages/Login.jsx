import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (!existingUser) {
      alert("User not registered. Please Signup first.");
      return;
    }

    if (existingUser.password !== password) {
      alert("Incorrect Password");
      return;
    }

    dispatch(login({ email, password }));
    navigate("/home");
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn align-center">Login</button>

        <p>
          Don't have account? <Link to="/signup" style={{ textDecoration: 'underline', textDecorationColor: 'red', color:'red' }}>Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;