import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { apiurl } from "../../api";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const role = roleRef.current.value;
    const securityQuestion = questionRef.current.value;
    const securityAnswer = answerRef.current.value.trim();

    if (!email || !password || !role || !securityQuestion || !securityAnswer) {
      setError("All fields are required.");
      return;
    }

    const username = email.split("@")[0];

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiurl + "/users/signup", {
        username,
        email,
        password,
        role,
        securityQuestion,
        securityAnswer,
      });

      const { status, message } = response.data;

      if (status) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-lg bg-white/40 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 border border-white/20 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center drop-shadow-sm">
          Create Your Account
        </h2>
        <p className="mt-2 text-base text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading && <p className="text-blue-500 mt-4 text-center">Signing up...</p>}

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

          {/* Role */}
          <div>
            <select
              ref={roleRef}
              defaultValue=""
              className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="" disabled>
                Select your role
              </option>
              {/* <option value="organizer">Organizer</option> */}
              <option value="exhibitor">Exhibitor</option>
              <option value="attendee">Attendee</option>
            </select>
          </div>

          {/* Security Question */}
          <div>
            <select
              ref={questionRef}
              defaultValue=""
              className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="" disabled>
                Select a security question
              </option>
              <option value="What is your favorite color?">
                What is your favorite color?
              </option>
              <option value="What is your mother’s maiden name?">
                What is your mother’s maiden name?
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="What city were you born in?">
                What city were you born in?
              </option>
            </select>
          </div>

          {/* Security Answer */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              ref={answerRef}
              placeholder="Enter your answer"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
