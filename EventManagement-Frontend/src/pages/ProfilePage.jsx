import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      setFormData({
        username: storedUser.username || "",
        email: storedUser.email || "",
        bio: storedUser.bio || "",
        location: storedUser.location || "",
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  // ✅ Update user API call
  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("bio", formData.bio || "");
      form.append("location", formData.location || "");
      if (formData.image) form.append("image", formData.image);

      console.log(form)
      const res = await axios.put(`http://localhost:3000/users/${user._id??user._id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data)
      if (res.data.status) {
        toast.success("Profile updated successfully!");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowEdit(false);
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10 animate-fade-in">
        {/* Header Section */}
        <div className="flex items-center space-x-6">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow-lg hover:scale-105 transition-transform duration-300"
            src={`http://localhost:3000${user.image}` || "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"}
            alt="Profile"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {user.username}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-3 bg-green-100 text-green-700 text-xs px-4 py-1 rounded-full">
              Active Member
            </span>
          </div>
        </div>

        {/* About & Details Section */}
        <div className="mt-10 space-y-8">
          {/* About */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
            <p className="text-gray-600">
              {user.bio ||
                "No description provided. You can edit your profile to add more details about yourself."}
            </p>
          </div>

          {/* Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Location:</strong> {user.location || "Not specified"}
              </li>
              <li>
                <strong>Role:</strong> {user.role || "User"}
              </li>
            </ul>
          </div>

          {/* Edit Button */}
          <div className="text-right">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <label className="block text-gray-600 font-medium">Profile Image</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full px-4 py-2 border rounded-xl mb-4"
            />

            {/* Username */}
            <label className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            {/* Email */}
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            {/* Bio */}
            <label className="block text-gray-600 font-medium">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            {/* Location */}
            <label className="block text-gray-600 font-medium">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
