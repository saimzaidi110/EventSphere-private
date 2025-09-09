import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FeedbackForm({ userId, eventId, onFeedbackSubmitted }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please enter feedback");
console.log({
    userId,
        eventId,
        message: comment, // ✅ backend expects "message"
        rating,
})
    try {
      const res = await axios.post("http://localhost:3000/api/feedbacks", {
        userId,
        eventId,
        message: comment, // ✅ backend expects "message"
        rating,
      });
console.log(res)
      if (res.data.success) { // ✅ backend returns "success"
        toast.success("Feedback submitted!");
        setComment("");
        setRating(5);
        if (onFeedbackSubmitted) onFeedbackSubmitted();
      } else {
        toast.warning(res.data.message || "Could not submit feedback");
      }
    } catch (err) {
      toast.error("Server error while submitting feedback");
      console.error("Feedback Submit Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-xl shadow mt-6"
    >
      <h2 className="text-xl font-semibold mb-3">Leave Feedback</h2>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
      />
      <div className="flex items-center gap-3 mb-3">
        <label className="font-medium">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
