import React from "react";
import TeamSection from "../component/Testimonal";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[80vh] flex items-center">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight leading-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
            We create unforgettable<br /> event experiences
          </h1>
          <p className="mb-8 text-lg font-medium text-gray-600 lg:text-xl sm:px-12 xl:px-44 dark:text-gray-400">
            At EventSphere, we specialize in turning every gathering into a moment worth remembering — connecting people, passions, and places.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="py-3 px-6 text-white bg-gradient-to-r from-[#625FFF] to-[#9813FA] hover:from-[#4F4BFF] hover:to-[#7A0FDA] rounded-lg text-lg font-semibold transition duration-300"
            >
              Explore Events
            </Link>
            <Link
              to="/signup"
              className="py-3 px-6 bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent border-2 border-[#625FFF] hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white rounded-lg text-lg font-semibold transition duration-300"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white min-h-screen flex flex-col items-center py-20 px-6 dark:bg-gray-100">
        <div className="max-w-5xl mx-auto ">
          <h1 className="text-5xl font-black bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mb-8 animate-fadeIn text-center">
            About <span className="text-gray-900">EventSphere</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-700 dark:text-gray-900 animate-fadeIn delay-100 text-center">
            Bringing people together through unforgettable experiences and seamless event discovery.
          </p>

         
          {/* Section 1 */}
          <section className="mt-24 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto ">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/08/00/17/events-2609526_640.jpg"
              alt="Event Highlights"
              className="rounded-xl shadow-lg object-cover w-full h-120"
            />
            <div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent mb-4 ">About Us</h3>
              <p className="text-gray-800 text-lg dark:text-gray-900">
               Event Sphere is a dynamic platform dedicated to revolutionizing the way events are planned, managed, and experienced. Whether you're organizing a small gathering, a corporate conference, or a large-scale festival, Event Sphere offers innovative tools and seamless solutions to make every event memorable and hassle-free. Our mission is to connect event organizers, vendors, and attendees in one interactive space, ensuring smooth communication and flawless execution from start to finish.

With a focus on user-friendly design and cutting-edge technology, Event Sphere empowers users to customize every detail, track progress in real-time, and engage their audience effectively. We believe that every event is unique, and through our platform, you can create personalized experiences that leave a lasting impact. Join Event Sphere today and transform your event planning journey into an exciting and rewarding adventure.

</p>
            </div>
          </section>

                 </div>

        {/* Meet Our Team */}
 <section>
  <TeamSection/>
</section>
        {/* Fade In Animations */}
        <style>{`
          .animate-fadeIn {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
          }
          .animate-fadeIn.delay-100 {
            animation-delay: 0.1s;
          }
          .animate-fadeIn.delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>
    </>
  );
}