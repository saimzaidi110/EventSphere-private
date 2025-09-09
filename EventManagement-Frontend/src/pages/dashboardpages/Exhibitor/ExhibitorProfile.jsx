import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "../../../component/NavbarComponent";
import FooterComponent from "../../../component/FooterComponent";

export default function ExhibitorProfile() {
  const { id } = useParams();
  const [exhibitor, setExhibitor] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch exhibitor details
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        if (res.data.status) {
          setExhibitor(res.data.user);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));

    // Fetch expos and filter where exhibitor is registered
    axios
      .get("http://localhost:3000/api/expos")
      .then((res) => {
        const expos = res.data;
        const registeredEvents = expos.filter((expo) =>
          expo.exhibitorList.some((ex) => ex.id === id)
        );
        setEvents(registeredEvents);
      })
      .catch((err) => console.error("Error fetching expos:", err));
  }, [id]);

  if (!exhibitor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 italic">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 pt-24">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-600"
              src={exhibitor.profilePic || "https://via.placeholder.com/150"}
              alt={exhibitor.username}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {exhibitor.username}
              </h2>
              <p className="text-gray-500">{exhibitor.email}</p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                Exhibitor
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
              <p className="text-gray-600">
                {exhibitor.about || "No description provided."}
              </p>
            </div>

            {/* Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Details
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>
                  <strong>Location:</strong> {exhibitor.location || "Unknown"}
                </li>
                <li>
                  <strong>Joined:</strong>{" "}
                  {new Date(exhibitor.createdAt).toLocaleDateString()}
                </li>
                <li>
                  <strong>Role:</strong> {exhibitor.role}
                </li>
              </ul>
            </div>

            {/* Registered Events Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Registered Events
              </h3>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {event.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {new Date(event.date).toLocaleDateString()} •{" "}
                            {event.location}
                          </p>
                          <p className="text-gray-500 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  This exhibitor is not registered in any events yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
