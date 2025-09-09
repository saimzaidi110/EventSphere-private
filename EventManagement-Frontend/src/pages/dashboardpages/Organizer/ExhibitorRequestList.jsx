import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiurl } from "../../../api";
import { FaFileAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const ExhibitorRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API data
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/expos`);
        const extractedRequests = res.data
          .flatMap((expo) =>
            expo.exhibitorRequests?.map((req) => ({
              ...req,
              expoTitle: expo.title,
              expoId: expo._id,
            })) || []
          )
          .filter((req) => req.username);
        setRequests(extractedRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load exhibitor requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (expoId, exhibitorId) => {
    try {
      const response = await axios.post(
        `${apiurl}/api/expos/approve-exhibitor`,
        {
          expoId,
          exhibitorRequestId: exhibitorId,
        }
      );

      if (response.status === 200) {
        toast.success("Exhibitor approved successfully!");
        setRequests((prev) =>
          prev.filter((req) => req._id !== exhibitorId)
        );
      } else {
        toast.error("Failed to approve exhibitor.");
      }
    } catch (error) {
      console.error("Error approving exhibitor:", error);
      const { response } = error
      const res = await axios.post(
        `${apiurl}/api/expos/reject-exhibitor`,
        {
          expoId,
          exhibitorRequestId: exhibitorId,
        }
      );

      if (res.status === 200) {
        toast.error(response.data.message + "Exhibitor request rejected");
        // toast.success("Exhibitor request rejected successfully!");
        setRequests((prev) =>
          prev.filter((req) => req._id !== exhibitorId)
        );
      } else {
        toast.error("Failed to reject exhibitor request.");
      }

    }
  };

  const handleReject = async (expoId, exhibitorId) => {
    try {
      const response = await axios.post(
        `${apiurl}/api/expos/reject-exhibitor`,
        {
          expoId,
          exhibitorRequestId: exhibitorId,
        }
      );

      if (response.status === 200) {
        toast.success("Exhibitor request rejected successfully!");
        setRequests((prev) =>
          prev.filter((req) => req._id !== exhibitorId)
        );
      } else {
        toast.error("Failed to reject exhibitor request.");
      }
    } catch (error) {
      console.error("Error rejecting exhibitor:", error);
      toast.error("An error occurred while rejecting.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4">
          <h2 className="text-xl font-bold">Exhibitor Requests</h2>
          <p className="text-sm opacity-90">Manage and approve exhibitor applications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {[
                  "Expo Title",
                  "Username",
                  "Email",
                  "Company",
                  "Products/Services",
                  "Documents",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{req.expoTitle}</td>
                    <td className="px-6 py-4">{req.username}</td>
                    <td className="px-6 py-4 text-gray-600">{req.email}</td>
                    <td className="px-6 py-4">{req.companyName}</td>
                    <td className="px-6 py-4">{req.productsServices}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FaFileAlt className="text-blue-500" />
                      <span>{req.documents || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => handleApprove(req.expoId, req._id)}
                        className="bg-gradient-to-r my-1 w-full from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.expoId, req._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow"
                      >
                        Reject
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <MdErrorOutline className="text-4xl text-gray-400 mb-2" />
                      <p className="text-lg font-medium">No exhibitor requests found</p>
                      <p className="text-sm text-gray-400">
                        When exhibitors apply for this expo, they will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorRequestList;
