import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import { UserContext } from "../context/UserContext";

export default function EventSchedules() {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch events (schedules)
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/expos")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error("Error fetching schedules:", err));
    }, []);

    // Fetch user bookmarks from API
    useEffect(() => {
        if (user?._id) {
            axios
                .get(`http://localhost:3000/api/bookmarks/${user._id}`)
                .then((res) => {
                    setBookmarks(res.data.map((b) => b.eventId._id));
                })
                .catch((err) => console.error("Error fetching bookmarks:", err));
        }
    }, [user]);

    // Handle bookmarking
    const toggleBookmark = async (eventId) => {
        if (!user?._id) {
            toast.error("Please login to bookmark sessions.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/bookmarks", {
                userId: user._id,
                eventId,
            });

            if (res.data.message === "Bookmark removed") {
                setBookmarks((prev) => prev.filter((id) => id !== eventId));
                toast.info("Removed from bookmarks");
            } else {
                setBookmarks((prev) => [...prev, eventId]);
                toast.success("Bookmarked successfully!");
            }
        } catch (err) {
            console.error("Error toggling bookmark:", err);
            toast.error("Something went wrong");
        }
    };

    // Handle session registration
    const handleRegister = (event) => {
        if (!user) {
            toast.error("Please login to register for a session.");
            return;
        }
        toast.success(`You are registered for "${event.title}"`);
    };

    // Filtered events based on search
    const filteredEvents = events.filter((ev) => {
        const query = searchQuery.toLowerCase();
        return (
            ev.title.toLowerCase().includes(query) ||
            ev.description.toLowerCase().includes(query) ||
            ev.speaker.toLowerCase().includes(query) ||
            ev.location.toLowerCase().includes(query) ||
            ev.theme.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <NavbarComponent />
            <div className="min-h-screen bg-gray-100 pt-[100px] p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        📅 Event Schedules
                    </h1>

                    {/* Search Box */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="🔍 Search events by title, speaker, theme, location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Events List */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                                >
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {event.title}
                                    </h2>
                                    <p className="text-gray-600">📍 {event.location}</p>
                                    <p className="text-gray-600">
                                        🗓 {new Date(event.date).toLocaleDateString()} | ⏰{" "}
                                        {event.time}
                                    </p>
                                    <p className="text-gray-700 mt-2">{event.description}</p>
                                    <p className="text-gray-600 mt-1">🎤 {event.speaker}</p>
                                    <p className="text-gray-600 mt-1">🎨 Theme: {event.theme}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        {/* Bookmark Button */}
                                        <button
                                            onClick={() => toggleBookmark(event._id)}
                                            className={`px-4 py-2 rounded-lg font-medium shadow transition ${bookmarks.includes(event._id)
                                                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                        >
                                            {bookmarks.includes(event._id)
                                                ? "★ Bookmarked"
                                                : "☆ Bookmark"}
                                        </button>

                                        {/* Register Button */}
                                        <button
                                            onClick={() => handleRegister(event)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            {searchQuery
                                ? "No events match your search."
                                : "No schedules found."}
                        </p>
                    )}

                    {/* My Bookmarks Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4">
                            ⭐ My Bookmarked Sessions
                        </h2>
                        {bookmarks.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                {events
                                    .filter((ev) => bookmarks.includes(ev._id))
                                    .map((ev) => (
                                        <li key={ev._id}>
                                            {ev.title} — {new Date(ev.date).toLocaleDateString()} at{" "}
                                            {ev.time}
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                You haven't bookmarked any sessions yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}
