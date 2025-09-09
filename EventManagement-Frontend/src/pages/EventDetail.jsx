import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";
import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import { Calendar, MapPin, Clock, Users, Mic, Palette, Building, Star, MessageCircle, ArrowLeft, User, Mail } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [activeTab, setActiveTab] = useState("details");

  // Fetch event details + feedbacks
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/expos/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));

    axios
      .get(`http://localhost:3000/api/feedbacks/${id}`)
      .then((res) => {
        if (res.data.success) {
          setFeedbacks(res.data.feedbacks);
        }
      })
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, [id]);

  useEffect(() => {
    const carousel = document.getElementById("feedback-carousel");
    if (!carousel) return;

    let scrollAmount = 0;
    const scrollStep = 320;
    const interval = setInterval(() => {
      if (carousel.scrollWidth - carousel.clientWidth <= scrollAmount) {
        scrollAmount = 0;
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount += scrollStep;
        carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [feedbacks]);

  //  Register
  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!event?._id) {
      toast.error("Expo ID is missing. Cannot register.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/expos/attendeeregister",
        {
          expoId: event._id,
          username: user.username,
          email: user.email,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.response?.data?.message || "Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  //  Submit feedback
  const handleFeedbackSubmit = async () => {
    if (!user) {
      toast.error("Please login to give feedback");
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      toast.warning("Feedback cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/feedbacks", {
        eventId: id,
        userId: user._id,
        username: user.username,
        message: comment,
        rating,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setComment("");
        setRating(5);
        setFeedbacks((prev) => [...prev, res.data.feedback]);
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.error("Feedback Error:", err);
      toast.error("Server error while submitting feedback");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </button>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Event Image */}
          <div className="relative">
            <img
              src={event.imageUrl || "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
              }}
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{event.title}</h1>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["details", "attendees", "exhibitors"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <Building className="h-5 w-5 text-orange-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Booths</p>
                      <p className="font-semibold">{event.booths}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Mic className="h-5 w-5 text-purple-600 mr-2" />
                      Speaker
                    </h3>
                    <p className="text-gray-700">{event.speaker}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Palette className="h-5 w-5 text-purple-600 mr-2" />
                      Theme
                    </h3>
                    <p className="text-gray-700">{event.theme}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#625FFF] to-[#9813FA] hover:from-[#4F4BFF] hover:to-[#7A0FDA]"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Registering...
                      </span>
                    ) : (
                      "Register for Expo"
                    )}
                  </button>
                </div>

                {/* Feedback Input */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your feedback..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r} Star{r !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleFeedbackSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow hover:from-purple-700 hover:to-blue-700 transition"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Feedback Carousel */}
                <div className="relative">
                  <div
                    id="feedback-carousel"
                    className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100"
                  >
                    {feedbacks.length > 0 ? (
                      feedbacks.map((fb, index) => (
                        <div
                          key={index}
                          className="min-w-[320px] max-w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                                {fb.username?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div className="ml-3">
                                <p className="font-semibold text-gray-800">{fb.username}</p>
                              </div>
                            </div>
                            <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                              <Star className="h-4 w-4 fill-current mr-1" />
                              {fb.rating || 5}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{fb.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="w-full text-center py-12 bg-gray-50 rounded-xl">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No feedback yet.</p>
                        <p className="text-gray-400 mt-2">Be the first to share your experience!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Attendees Tab */}
            {activeTab === "attendees" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-2" />
                  Attendees
                </h2>
                {event.attendeeList?.length > 0 ? (
                  <div className="bg-white rounded-xl shadow-inner overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {event.attendeeList.map((att, index) => (
                            <tr key={att._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                {att.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {att.email}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No attendees registered yet.</p>
                    <p className="text-gray-400 mt-2">Be the first to register!</p>
                  </div>
                )}
              </div>
            )}

            {/* Exhibitors Tab */}
            {activeTab === "exhibitors" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Building className="h-6 w-6 text-purple-600 mr-2" />
                  Exhibitors
                </h2>
                {event.exhibitorList?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.exhibitorList.map((ex) => (
                      <div
                        key={ex._id}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{ex.companyName}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <User className="h-4 w-4 mr-2" />
                          <span>{ex.username}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{ex.email}</span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">Products/Services:</p>
                          <p className="text-gray-600">{ex.productsServices}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Documents:</p>
                          <p className="text-gray-600">{ex.documents}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No exhibitors yet.</p>
                    <p className="text-gray-400 mt-2">Check back later for exhibitor updates.</p>
                  </div>
                )}
              </div>
            )}

            {/* Feedback Tab */}
            {/* {activeTab === "feedback" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="h-6 w-6 text-purple-600 mr-2" />
                  Feedback
                </h2>

                
              </div>
            )} */}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}