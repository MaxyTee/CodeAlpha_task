import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Facebook,
  Chrome,
  User,
} from "lucide-react";
import bg from "/bg-image.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { signup, login, isLoading, loginError, signupError } = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (!isLogin && !agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    const payload = { email, password, name };

    try {
      if (isLogin) {
        const response = await login(payload);
        if (response?.success) {
          navigate("/homePage");
        }
      } else {
        const response = await signup(payload);
        if (response.success) {
          console.log("Created");
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form submitted:", { email, password });

    // alert(isLogin ? "Login successful!" : "Account created successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image/Brand Section */}
      <div className="relative lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="absolute inset-0">
          <img
            src={bg}
            alt="Fashion Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-60"></div>

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-500 opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white text-center max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wider">
            Miblo
          </h1>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl mb-8 font-light">
            Your space to share and discover
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Toggle Login/Signup */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  isLogin ? "bg-red-500 text-white" : "text-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  !isLogin ? "bg-red-500 text-white" : "text-gray-600"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to start your fashion journey"}
          </p>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Terms for Sign Up */}
            {!isLogin && (
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-red-500 hover:text-red-600">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-red-500 hover:text-red-600">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
            )}

            {isLogin && loginError && (
              <p className="text-red-600">{loginError}</p>
            )}
            {!isLogin && signupError && (
              <p className="text-red-600">{signupError}</p>
            )}

            {/* Submit Button */}
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`w-full ${
                isLoading
                  ? "bg-gray-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              } bg-gradient-to-r from-red-900 to-pink-900 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl`}
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
