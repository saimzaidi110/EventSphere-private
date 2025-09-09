import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  Calendar,
  PlusSquare,
  BarChart2,
  Settings,
  HelpCircle,
  ClipboardList,
} from "lucide-react";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  // Define nav items per role
  const organizerNavItems = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "profile", label: "Profile", icon: <User size={18} /> },
    { to: "users", label: "Users", icon: <Users size={18} /> },
    { to: "createevent", label: "Create Event", icon: <PlusSquare size={18} /> },
    { to: "events", label: "Expo & Events", icon: <Calendar size={18} /> },
    { to: "exhibitorrequestlist", label: "Exhibitor Request", icon: <ClipboardList size={18} /> },
    { to: "schedulemanagement", label: "Schedule Management", icon: <Calendar size={18} /> },
    { to: "feedbacks", label: "Feedbacks", icon: <BarChart2 size={18} /> },
    { to: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { to: "setting", label: "Settings", icon: <Settings size={18} /> },
    { to: "help", label: "Help", icon: <HelpCircle size={18} /> },
  ];

  const exhibitorNavItems = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "events", label: "Expo & Events", icon: <Calendar size={18} /> },
    { to: "setting", label: "Settings", icon: <Settings size={18} /> },
    { to: "help", label: "Help", icon: <HelpCircle size={18} /> },
    { to: "profile", label: "Profile", icon: <User size={18} /> },
    { to: "notifictaions", label: "Notifications", icon: <User size={18} /> },
  ];

  // Default for others (attendee or no user)
  const defaultNavItems = [
    { to: "/", label: "Home", icon: <LayoutDashboard size={18} /> },
    { to: "help", label: "Help", icon: <HelpCircle size={18} /> },
  ];

  // Pick nav items based on user role
  let navItems;
  if (user?.role === "organizer") {
    navItems = organizerNavItems;
  } else if (user?.role === "exhibitor") {
    navItems = exhibitorNavItems;
  } else {
    navItems = defaultNavItems;
  }

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 h-screen fixed top-0 left-0 shadow-xl flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center justify-center border-b border-gray-700">
        <h2 className="text-2xl font-extrabold text-indigo-400 tracking-wide">
          EventSphere
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors duration-200 ${
                active
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-400">
        © 2025 EventSphere
      </div>
    </div>
  );
};

export default Sidebar;
