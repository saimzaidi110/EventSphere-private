import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import { Calendar, MapPin, Star, ArrowRight, Search } from "lucide-react";

export default function ExpoList() {
  const [expos, setExpos] = useState([]);
  const [filteredExpos, setFilteredExpos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/expos")
      .then((res) => {
        setExpos(res.data);
        setFilteredExpos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching expos:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = expos.filter(expo => 
      expo && (
        (expo.title && expo.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (expo.location && expo.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (expo.theme && expo.theme.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
    setFilteredExpos(filtered);
  }, [searchTerm, expos]);

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      
      {/* Hero Section with Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Banner Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="EventSphere Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/60"></div>
        </div>

        {/* Content */}
        <div className="px-4 mx-auto max-w-4xl text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Amazing <span className="bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">Expos</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Explore the most exciting exhibitions and events happening around you. Book your tickets and booths with ease.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search expos by title, location, or theme..."
              className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Results Count */}
        <div className="max-w-7xl mx-auto mb-8">
          <p className="text-gray-600 text-lg">
            {filteredExpos.length} {filteredExpos.length === 1 ? 'expo' : 'expos'} found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Expos Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredExpos.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">No expos found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or check back later for new events.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white rounded-lg hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExpos
                .filter((expo) => expo && expo._id)
                .map((expo) => (
                  <div
                    key={expo._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative">
                      <img
                        src={expo.imageUrl || "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={expo.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-purple-600 shadow-md">
                          <Star className="h-3 w-3 fill-current mr-1" />
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">{expo.title}</h2>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{new Date(expo.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{expo.location}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{expo.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                          {expo.theme}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {expo.booths} {expo.booths === 1 ? 'Booth' : 'Booths'}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/event/${expo._id}`)}
                        className="w-full bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white py-3 rounded-xl font-semibold hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Load More Button (for pagination in future) */}
        {filteredExpos.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white font-semibold rounded-lg hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-all duration-300 transform hover:scale-105 shadow-md">
              Load More Expos
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>

      <FooterComponent />

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}