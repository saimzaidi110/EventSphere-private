import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterComponent from "../component/FooterComponent";
import NavbarComponent from "../component/NavbarComponent";
import { Link } from "react-router-dom";

export default function ExhibitorsTable() {
  const [exhibitors, setExhibitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        if (res.data.status) {
          const exhibitorData = res.data.users.filter(
            (user) => user.role === "exhibitor"
          );
          setExhibitors(exhibitorData);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const filteredExhibitors = exhibitors.filter(
    (ex) =>
      ex.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 pt-24">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Exhibitors Directory
          </h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExhibitors.length > 0 ? (
                  filteredExhibitors.map((ex, index) => (
                    <tr
                      key={ex._id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="p-4 border-b">{index + 1}</td>
                      <td className="p-4 border-b font-medium">{ex.username}</td>
                      <td className="p-4 border-b text-gray-600">{ex.email}</td>
                      <td className="p-4 border-b flex gap-2">
                        <a
                          href={`mailto:${ex.email}`}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transform transition duration-200"
                        >
                          Contact
                        </a>

                        {/* ✅ See Profile button */}
                        <Link
                          to={`/exhibitor/${ex._id}`}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transform transition duration-200"
                        >
                          See Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-500 py-6 italic"
                    >
                      No exhibitors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
