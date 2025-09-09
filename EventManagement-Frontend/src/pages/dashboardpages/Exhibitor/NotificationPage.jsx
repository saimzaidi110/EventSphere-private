import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const NotificationPage = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/notifications/${user._id}`
      );
      setNotifications(res.data.notifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications", error);
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:3000/api/notifications/read`, {
        userId: user._id,
        notificationId,
      });
      fetchNotifications(); // refresh list
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🔔 Notifications
      </h2>

      {notifications && notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications?.map((notif) => {
            // Decide background color
            let bgColor = "bg-white";
            if (notif.type === "approval" && !notif.isRead)
              bgColor = "bg-green-100 border-green-400";
            else if (notif.type === "rejection" && !notif.isRead)
              bgColor = "bg-red-100 border-red-400";
            else if (notif.isRead) bgColor = "bg-gray-100 border-gray-300";

            return (
              <li
                key={notif._id}
                className={`p-4 border rounded-xl shadow-sm transition duration-300 hover:shadow-md ${bgColor}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{notif.message}</p>
                    <small className="text-gray-500">
                      {new Date(notif.createdAt).toLocaleString()}
                    </small>
                  </div>
                {!notif.isRead && (
  <button
    onClick={() => markAsRead(notif._id)}
    className="ml-4 px-3 py-1.5 border border-blue-500 text-blue-600 text-sm rounded-lg hover:bg-gradient-to-r from-[#625FFF] to-[#9813FA] hover:text-white transition whitespace-nowrap"
  >
    Mark as read
  </button>
)}
    
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
