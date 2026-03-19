import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#121212] px-4">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white dark:bg-[#1f1f1f] 
          p-6 sm:p-8 md:p-10 
          rounded-lg shadow-lg 
          w-full max-w-full sm:max-w-md md:max-w-lg 
          flex flex-col gap-6
          mx-2
        "
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3600e6]">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          required
          autoComplete="username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="px-4 py-3 border rounded outline-none dark:bg-[#2c2c2c] dark:text-white text-base sm:text-lg"
        />

        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-3 border rounded outline-none dark:bg-[#2c2c2c] dark:text-white text-base sm:text-lg"
        />

        <button className="bg-[#3600e6] text-white py-3 sm:py-4 rounded hover:bg-green-500 transition text-base sm:text-lg ">
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
}

export default Login;