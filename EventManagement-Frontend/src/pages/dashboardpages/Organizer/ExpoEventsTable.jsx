import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExpoEventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    theme: "",
    imageUrl: "",
    booths: ""
  });

  // Fetch all events
  const fetchEvents = () => {
    fetch("http://localhost:3000/api/expos")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/expos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Event deleted successfully!");
        fetchEvents();
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open edit form
  const handleEdit = (event) => {
    setEditEvent(event._id);
    setFormData({
      title: event.title,
      date: event.date.split("T")[0],
      location: event.location,
      description: event.description,
      theme: event.theme,
      imageUrl: event.imageUrl,
      booths: event.booths
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/expos/${editEvent}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Event updated successfully!");
        setEditEvent(null);
        fetchEvents();
      } else {
        toast.error("Failed to update event.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading events...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expo Events</h2>

      {/* Edit Form */}
      {editEvent && (
        <form
          onSubmit={handleUpdate}
          className="mb-6 bg-white p-4 rounded shadow-md"
        >
          <h3 className="text-lg font-semibold mb-3">Edit Event</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* _id Hidden */}
            <input type="hidden" value={editEvent} />

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              placeholder="Theme"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="booths"
              value={formData.booths}
              onChange={handleChange}
              placeholder="Booths"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 rounded"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded col-span-2"
            />
          </div>
          <div className="mt-4 space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditEvent(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Theme</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Booths</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{event.title}</td>
                  <td className="py-3 px-4">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{event.location}</td>
                  <td className="py-3 px-4">{event.description}</td>
                  <td className="py-3 px-4">{event.theme}</td>
                  <td className="py-3 px-4">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{event.booths}</td>
                 
                  <td className="  py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 my-1 w-full text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white w-full px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-4 text-gray-500"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpoEventsTable;
