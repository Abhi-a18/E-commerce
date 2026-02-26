import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    dispatch(signup({ email, password }));
    alert("Signup Successful! Please Login.");
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>Signup</h2>

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

        <button className="btn align-center">Signup</button>

        <p>
          Already have account? <Link to="/" style={{ textDecoration: 'underline', textDecorationColor: 'red', color:'red' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;