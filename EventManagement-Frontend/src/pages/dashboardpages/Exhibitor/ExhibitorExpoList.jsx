import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../../api";

export default function ExhibitorExpoList() {
  const [expos, setExpos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiurl}/api/expos`)
      .then((res) => {
        setExpos(res.data);
      })
      .catch((err) => {
        console.error("Error fetching expos:", err);
      });
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Expos</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {expos
            .filter((expo) => expo && expo._id)
            .map((expo) => (
              <div
                key={expo._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={expo.imageUrl}
                  alt={expo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{expo.title}</h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(expo.date).toLocaleDateString()} - {expo.location}
                  </p>
                  <p className="mt-2 text-gray-700">{expo.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Theme: {expo.theme} | Booths: {expo.booths}
                  </p>
                  <button
                    onClick={() => navigate(`/dashboard/exporegister/${expo._id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

    </>
  );
}
