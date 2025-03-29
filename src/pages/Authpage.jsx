import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn); 

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-white">
        <img
          src="/cover.jpeg"
          alt="desk illustration"
          className="w-3/4 object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-[#1E90FF] mb-4">Welcome Back!</h2>
          <p className="text-lg text-gray-500 mb-10">Please login to continue</p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex items-center border-b border-gray-300 py-3 text-lg">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full focus:outline-none text-lg"
                required
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-3 text-lg">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full focus:outline-none text-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-xl bg-[#1E90FF] hover:bg-[#1E90FF] text-white py-2.5 text-base rounded-full transition mt-6 cursor-pointer"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
