import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeedbackOrganizer() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/contact");
        if (res.data.success) {
          setFeedbacks(res.data.data);
        }
      } catch (err) {
        setError("❌ Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
            <span className="mr-3">📋</span> Feedback Organizer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage and review all customer feedback in one place. Stay connected with your audience's needs and suggestions.
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-blue-100">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Feedbacks</div>
            <div className="text-3xl font-bold text-blue-600">{feedbacks.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-green-100">
            <div className="text-sm font-medium text-gray-500 mb-1">With Email</div>
            <div className="text-3xl font-bold text-green-600">
              {feedbacks.filter(fb => fb.email).length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-purple-100">
            <div className="text-sm font-medium text-gray-500 mb-1">With Company</div>
            <div className="text-3xl font-bold text-purple-600">
              {feedbacks.filter(fb => fb.company).length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-yellow-100">
            <div className="text-sm font-medium text-gray-500 mb-1">Recent (7 days)</div>
            <div className="text-3xl font-bold text-yellow-600">
              {feedbacks.filter(fb => {
                const feedbackDate = new Date(fb.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return feedbackDate > weekAgo;
              }).length}
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === "card" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}
            >
              Card View
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {feedbacks.length} {feedbacks.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading feedbacks...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500 text-xl">❌</span>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && feedbacks.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No feedback yet</h3>
            <p className="text-gray-500">Customer feedback will appear here once they start submitting.</p>
          </div>
        )}

        {/* Table View */}
        {!loading && !error && feedbacks.length > 0 && viewMode === "table" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedbacks.map((fb) => (
                    <tr key={fb._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">{fb.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{fb.name}</div>
                            <div className="text-sm text-gray-500">{fb.company || "No company"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{fb.email}</div>
                        <div className="text-sm text-gray-500">{fb.phone || "No phone"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{truncateText(fb.message, 60)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(fb.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedFeedback(fb)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Card View */}
        {!loading && !error && feedbacks.length > 0 && viewMode === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((fb) => (
              <div key={fb._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{fb.name}</h3>
                      <p className="text-sm text-gray-500">{fb.company || "No company"}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {formatDate(fb.createdAt).split(',')[0]}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="mr-2">📧</span>
                      {fb.email || "No email"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📱</span>
                      {fb.phone || "No phone"}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 text-sm">
                      {truncateText(fb.message, 100)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedFeedback(fb)}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read full message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Feedback Details</h2>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                    <p className="text-gray-900">{selectedFeedback.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Company</h3>
                    <p className="text-gray-900">{selectedFeedback.company || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p className="text-gray-900">{selectedFeedback.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                    <p className="text-gray-900">{selectedFeedback.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Received</h3>
                  <p className="text-gray-900">{formatDate(selectedFeedback.createdAt)}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 rounded-b-xl flex justify-end">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}