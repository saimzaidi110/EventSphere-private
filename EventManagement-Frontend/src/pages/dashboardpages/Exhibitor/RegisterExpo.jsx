import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiurl } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

const RegisterExpo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { username, email } = user;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    productsServices: "",
    documents: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiurl}/api/expos/exporegisterrequest`,
        {
          expoId: id,
          username,
          email,
          ...formData,
        }
      );

      if (response.data.status) {
        toast.success("Expo registration request submitted successfully!");
        navigate("/dashboard/events");
      } else {
        toast.error("Failed to submit registration request.");
      }
    } catch (error) {
      toast.error("Error submitting the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-10 transform transition duration-500 hover:scale-[1.02]">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">
          Register for Expo
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Please provide your company details to participate in this expo.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>

          {/* Products / Services */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Products / Services
            </label>
            <input
              type="text"
              name="productsServices"
              value={formData.productsServices}
              onChange={handleChange}
              required
              placeholder="E.g. IT Solutions, Electronics"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>

          {/* Required Documents */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Required Documents (Links or Descriptions)
            </label>
            <input
              type="text"
              name="documents"
              value={formData.documents}
              onChange={handleChange}
              required
              placeholder="Provide links or details"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterExpo;
