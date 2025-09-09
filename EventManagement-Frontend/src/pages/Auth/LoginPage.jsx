import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { apiurl } from "../../api";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const { userlogin } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1); // 1 = email, 2 = question
  const [forgotEmail, setForgotEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiurl + "/users/login", { email, password });
      let { status, message, user, token } = response.data;

      if (status) {
        toast.success(message);
        userlogin(user);
        localStorage.setItem("token", token);

        if (user?.role !== "attendee") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password Step 1: Get question
  const handleGetQuestion = async () => {
    try {
      const res = await axios.post(apiurl + "/users/forgot-password/question", {
        email: forgotEmail,
      });
      if (res.data.status) {
        setSecurityQuestion(res.data.question);
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error fetching security question");
    }
  };

  // Forgot password Step 2: Reset password
  const handleResetPassword = async () => {
    try {
      const res = await axios.post(apiurl + "/users/forgot-password/reset", {
        email: forgotEmail,
        answer,
        newPassword,
      });
      if (res.data.status) {
        toast.success("Password reset successful! Please login.");
        setShowForgot(false);
        setStep(1);
        setForgotEmail("");
        setAnswer("");
        setNewPassword("");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error resetting password");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-lg bg-white/40 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 border border-white/20 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center drop-shadow-sm">
          Welcome Back!
        </h2>
        <p className="mt-2 text-base text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading && <p className="text-blue-500 mt-4 text-center">Logging in...</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:underline"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96">
            <h3 className="text-xl font-semibold mb-4 text-center">Forgot Password</h3>

            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleGetQuestion}
                  className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:scale-[1.02] transition"
                >
                  Get Security Question
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p className="mb-2 font-medium">Security Question:</p>
                <p className="mb-4 text-gray-700">{securityQuestion}</p>
                <input
                  type="text"
                  placeholder="Your Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-[1.02] transition"
                >
                  Reset Password
                </button>
              </>
            )}

            <button
              className="mt-4 w-full text-sm text-gray-600 hover:underline"
              onClick={() => {
                setShowForgot(false);
                setStep(1);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
