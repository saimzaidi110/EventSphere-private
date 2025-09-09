import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MessageCircle, LogOut } from "lucide-react"; // ✅ icons

const Navbar = () => {
  const navigate = useNavigate();
  const {user, userlogout } = useContext(UserContext);

  const HandleLogout = () => {
    userlogout();
    navigate("/login");
  };

  const HandleChat = () => {
    navigate("/chat");
  };

  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Brand / Title */}
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Chat Button */}
        <button
          onClick={HandleChat}
          className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
          title="Chat"
        >
          <MessageCircle size={20} />
        </button>

        {/* Profile Avatar (optional future use) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
          <img
           src={`http://localhost:3000${user.image}` || "https://i.pravatar.cc/40"}

            alt="profile"
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-700">{user.role}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={HandleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
