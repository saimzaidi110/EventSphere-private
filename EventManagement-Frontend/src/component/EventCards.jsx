import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventCardsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/expo")
      .then((res) => {
        if (res.data.status) {
          // Get only the first 3 events
          const slicedEvents = res.data.data.slice(0, 3);
          setEvents(slicedEvents);
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <section className="mt-20 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
              index === 1 ? "bg-gradient-to-r from-[#625FFF] to-[#9813FA]" : "bg-[#1E293B]"
            }`}
          >
            <img
              src={event.imgUrl}
              alt={event.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {event.title}
                </h3>
                <p className="text-sm text-white opacity-90">
                  {event.description.length > 120
                    ? `${event.description.slice(0, 120)}...`
                    : event.description}
                </p>
              </div>

              <Link
                to={`/events/${event._id}`}
                className={`mt-6 inline-block font-semibold px-5 py-2.5 rounded-full transition duration-300 text-center shadow-lg ${
                  index === 1
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white hover:from-[#4F4BFF] hover:to-[#7A0FDA]"
                }`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCardsSection;