import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/authSlice';

function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { userName: username, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setEmail("");
      setPassword("");
      setUserName("");
      setErr("");
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 transition-transform transform hover:scale-[1.02]">
        
        <div className="w-full h-[100px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-3xl flex items-center justify-center shadow-lg">
          <h1 className="text-white text-3xl font-extrabold drop-shadow-lg">
            Welcome
          </h1>
        </div>

        <form className="flex flex-col gap-5 mt-6" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 transition duration-200"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 transition duration-200"
            required
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 transition duration-200"
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-500 font-semibold cursor-pointer select-none"
              onClick={() => setShow(prev => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-red-500 font-medium text-center animate-fadeIn">{err}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-500 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
