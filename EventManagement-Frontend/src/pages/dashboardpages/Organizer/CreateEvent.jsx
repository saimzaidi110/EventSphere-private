import React, { useState } from "react";
import { apiurl } from "../../../api";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    theme: "",
    themeColor: "#0a74da",
    imageUrl: "",
    booths: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const today = new Date().toISOString().split("T")[0];

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.trim().length >= 3 ? "" : "Title must be at least 3 characters";
      case "date":
        return value ? "" : "Date is required";
      case "location":
        return value.trim().length >= 5 ? "" : "Location must be at least 5 characters";
      case "booths":
        return value >= 1 ? "" : "Must have at least 1 booth";
      case "imageUrl":
        if (!value) return "";
        const pattern = /https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
        return pattern.test(value) ? "" : "Please enter a valid image URL";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Validate field on change if it has been touched
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setError(errorMsg);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate the field when it loses focus
    const errorMsg = validateField(name, formData[name]);
    setError(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    // Validate all fields before submitting
    const newTouched = {};
    let hasError = false;
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg && key !== "imageUrl") { // imageUrl is optional
        setError(errorMsg);
        hasError = true;
      }
    });
    
    setTouched(newTouched);
    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      booths: Number(formData.booths),
      date: new Date(formData.date).toISOString(),
    };

    try {
      const response = await fetch(apiurl + "/api/expos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ " + result.message);
        setFormData({
          title: "",
          date: "",
          location: "",
          description: "",
          theme: "",
          themeColor: "#0a74da",
          imageUrl: "",
          booths: "",
        });
        setTouched({});
      } else {
        setError("❌ " + (result.message || "Failed to create event"));
      }
    } catch (err) {
      setError("❌ Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Expo Event</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Expo Title *"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full ${
              touched.title && validateField("title", formData.title) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {touched.title && validateField("title", formData.title) && (
            <p className="text-red-500 text-sm mt-1">{validateField("title", formData.title)}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            min={today}
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full ${
              touched.date && validateField("date", formData.date) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {touched.date && validateField("date", formData.date) && (
            <p className="text-red-500 text-sm mt-1">{validateField("date", formData.date)}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="location"
            placeholder="Location *"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full ${
              touched.location && validateField("location", formData.location) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {touched.location && validateField("location", formData.location) && (
            <p className="text-red-500 text-sm mt-1">{validateField("location", formData.location)}</p>
          )}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="theme"
          placeholder="Theme"
          value={formData.theme}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />

        {/* Theme Color Picker */}
        <div className="flex items-center gap-4">
          <label className="block text-gray-700 font-medium">
            Theme Color
          </label>
          <input
            type="color"
            name="themeColor"
            value={formData.themeColor}
            onChange={handleChange}
            className="w-16 h-10 cursor-pointer border rounded"
          />
          <div 
            className="w-8 h-8 rounded-full border"
            style={{ backgroundColor: formData.themeColor }}
          ></div>
        </div>

        {/* Image URL with pattern */}
        <div>
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL (https://example.com/image.jpg)"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            pattern="https?://.*\.(jpg|jpeg|png|gif|webp)$"
            title="Please enter a valid image URL (jpg, jpeg, png, gif, webp)"
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full ${
              touched.imageUrl && validateField("imageUrl", formData.imageUrl) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {touched.imageUrl && validateField("imageUrl", formData.imageUrl) && (
            <p className="text-red-500 text-sm mt-1">{validateField("imageUrl", formData.imageUrl)}</p>
          )}

          {/* Preview if URL is valid */}
          {formData.imageUrl && !validateField("imageUrl", formData.imageUrl) && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full max-h-60 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <input
            type="number"
            name="booths"
            placeholder="Number of Booths *"
            value={formData.booths}
            onChange={handleChange}
            onBlur={handleBlur}
            min="1"
            required
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full ${
              touched.booths && validateField("booths", formData.booths) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {touched.booths && validateField("booths", formData.booths) && (
            <p className="text-red-500 text-sm mt-1">{validateField("booths", formData.booths)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white py-3 rounded-lg font-medium transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Expo"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;