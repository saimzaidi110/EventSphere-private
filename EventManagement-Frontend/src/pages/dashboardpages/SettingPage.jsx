import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export default function SettingPage() {
  const { user ,userlogout} = useContext(UserContext)
  const navigate = useNavigate()
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Update Password
  const handleUpdate = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updating password:", formData);
    setShowUpdateForm(false);
  };

  // ✅ Delete Account
  const handleDelete = async () => {

    try {
      let res = await axios.delete(`http://localhost:3000/users/${user._id}`)
console.log(res.data)
      setShowDeleteConfirm(false);
      toast.success("Account Deleted!");
      navigate('/login')
      userlogout()
    } catch (error) {
      console.log(error)
      toast.error("Failed to Delete Account!");
      setShowDeleteConfirm(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Settings
          </h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>

        {/* Account Settings Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
            Account Settings
          </h2>

          <div className="divide-y divide-gray-200">
            {/* Email Notifications */}
            <div className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-gray-700 font-medium">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your notification preferences
                </p>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                Manage
              </button>
            </div>

            {/* Privacy Settings */}
            <div className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-gray-700 font-medium">Privacy Settings</h3>
                <p className="text-sm text-gray-500">
                  Control your account visibility
                </p>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                Edit
              </button>
            </div>

            {/* Change Password */}
            <div className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-gray-700 font-medium">Change Password</h3>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>
              <button
                onClick={() => setShowUpdateForm(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 flex items-center">
            <span className="w-2 h-8 bg-red-500 rounded-full mr-3"></span>
            Danger Zone
          </h2>
          <p className="text-sm text-red-500 mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* 🔹 Update Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>

            <label className="block text-gray-600 font-medium">Old Password</label>
            <input
              type="password"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            <label className="block text-gray-600 font-medium">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            <label className="block text-gray-600 font-medium">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl mb-4"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUpdateForm(false)}
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

      {/* 🔹 Delete Confirm Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
