import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Users } from "lucide-react";
import NavbarComponent from '../component/NavbarComponent'
import EventCards from "../component/EventCards"
import FooterComponent from "../component/FooterComponent";

export default function HomePage() {
  const testimonials = [
    {
      name: "Imran Malik",
      feedback:
        "Working with Shahzaib was a fantastic experience! He transformed my ideas into a professional and modern website. His communication was clear, and delivery was even faster than expected. Highly recommended!",
      designation: "Founder, DigitalSpark",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Ahmed",
      feedback:
        "Extremely talented and reliable. Shahzaib handled our WordPress project from start to finish with great attention to detail. We've already hired him for our next job!",
      designation: " CEO, TechNova",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Anaya Noor",
      feedback:
        "Shahzaib's work speaks for itself. The portfolio site he built for me is fast, beautiful, and easy to manage. He even optimized it for SEO. Couldn't ask for more!",
      designation: "Blogger & Content Creator",
      image:
        "https://media.istockphoto.com/id/2156170315/photo/a-cheerful-female-party-planner-holds-a-clipboard-in-her-hands-while-looking-directly-at-the.jpg?s=612x612&w=0&k=20&c=fnh2niXtfBnyrpMX14wQNXvDBzDejdiS36c-3lyaLlk=",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="bg-white dark:text-white">
      {/* Navbar */}
      <NavbarComponent />

      {/* Hero Section with Banner Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Banner Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
          // src="public/homepage_banner.png"
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="EventSphere Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/60"></div>
        </div>

        {/* Content */}
        <div className="px-4 mx-auto max-w-screen-xl text-center z-10 relative">
          <h1 className="mb-6 text-5xl font-bold tracking-tight leading-tight text-white md:text-6xl lg:text-7xl">
            Welcome to EventSphere
          </h1>
          <p className="mb-8 text-lg font-medium text-gray-200 lg:text-xl sm:px-12 xl:px-44">
            Discover, explore, and attend the most exciting expos and events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="py-3 px-6 text-white bg-gradient-to-r from-[#625FFF] to-[#9813FA] hover:from-[#4F4BFF] hover:to-[#7A0FDA] rounded-lg text-lg font-semibold transition duration-300"
            >
              Explore Events
            </Link>
            <Link
              to="/contact"
              className="py-3 px-6 bg-white text-gray-900 rounded-lg text-lg font-semibold transition duration-300 hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="max-w-5xl mx-auto ">
        <h1 className="text-5xl font-black bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mt-20 mb-8 animate-fadeIn text-center">
          About <span className="text-gray-900">EventSphere</span>
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-900 animate-fadeIn delay-100 text-center">
          Whether you're a business looking to showcase your products or an
          enthusiast eager to explore new opportunities, EventSphere provides an
          intuitive platform to discover, book, and attend events with ease.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16 animate-fadeIn delay-200 ">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-[#625FFF]/40 transition-shadow duration-300 text-left">
            <div className="bg-gradient-to-r from-[#625FFF] to-[#9813FA] p-2 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Star className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
              Live Expos
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Access dynamic and engaging expos happening around the world.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-[#625FFF]/40 transition-shadow duration-300 text-left">
            <div className="bg-gradient-to-r from-[#625FFF] to-[#9813FA] p-2 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
              Booth Booking
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Reserve and manage your booth spaces effortlessly with EventSphere.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-[#625FFF]/40 transition-shadow duration-300 text-left">
            <div className="bg-gradient-to-r from-[#625FFF] to-[#9813FA] p-2 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
              Event Insights
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Get detailed schedules, speaker bios, and insights at your
              fingertips.
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <section className="mt-20 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-4xl font-black bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mb-4 text-left">
              About Us
            </h3>
            <p className="text-gray-800 text-lg text-left">
              Event Sphere ek innovative platform hai jo event planning aur
              management ko asaan aur behtareen banata hai. Chahe aap chhoti
              gathering organize kar rahe ho ya bara corporate event, Event
              Sphere apne smart tools aur seamless features ke zariye har qadam
              par madad karta hai, taake aapka event kamyab aur yaadgar ban
              jaye.
            </p>
            <Link
              to="/about"
              className="inline-block bg-gradient-to-r from-[#625FFF] to-[#9813FA] mt-8 text-white px-6 py-3 rounded-lg font-semibold hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition"
            >
              Learn More About Us
            </Link>
          </div>
          <img
            src="https://thumbs.dreamstime.com/b/wedding-hall-17035049.jpg"
            alt="Smart Event Search"
            className="rounded-xl shadow-lg object-cover w-full h-100"
          />
        </section>

        {/* Events Section */}
        <section>
          <EventCards />
        </section>

        {/* Highlights Section */}
        <section className="mt-24 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <img
            src="https://cdn0.weddingwire.com/vendor/371610/3_2/640/png/wedding-2_51_16173-170473476698522.jpeg"
            alt="Event Highlights"
            className="rounded-xl shadow-lg object-cover w-full h-80"
          />
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mb-4">
              Connecting Moments
            </h3>
            <p className="text-gray-800 leading-relaxed">
              From concerts to conferences, EventSphere matches you with events
              that align with your passions, enabling connection and community
              through shared experiences.
            </p>
          </div>
        </section>

        {/* Smart Discovery */}
        <section className="mt-20 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mb-4">
              Smart Discovery
            </h3>
            <p className="text-gray-800 leading-relaxed">
              With curated recommendations and live notifications, EventSphere
              helps you stay ahead and informed about every opportunity near and
              far.
            </p>
          </div>
          <img
            src="https://panel.eventsbooking.pk/Content/Images/ETG8.jpg"
            alt="Smart Event Search"
            className="rounded-xl shadow-lg object-cover w-full h-80"
          />
        </section>
      </div>

      {/* Testimonials */}
      <section className="mt-20 py-12 bg-gray-100 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ image, feedback, name, designation }, index) => {
              const isPurple = index === 1;

              return (
                <div
                  key={index}
                  className={`relative shadow-xl rounded-lg px-6 pt-16 pb-6 text-center ${isPurple ? "bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white" : "bg-white"}`}
                >
                  {/* Circle Image */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg bg-white border-4 border-white"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  <p className={`mt-4 text-sm leading-relaxed mb-6 italic ${isPurple ? "text-gray-200" : "text-gray-600"}`}>
                    {feedback}
                  </p>

                  {/* Name */}
                  <h3 className={`text-lg font-bold ${isPurple ? "text-white" : "text-gray-900"}`}>{name}</h3>

                  {/* Designation */}
                  <p className={`text-sm ${isPurple ? "text-gray-200" : "text-gray-600"}`}>{designation}</p>

                  {/* Stars */}
                  <div className="mt-2 flex justify-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    <FooterComponent/>
    
    </div>
  );
}