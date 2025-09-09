import React from "react";
import { ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import NavbarComponent from '../component/NavbarComponent'
import react from "../../public/react.svg";
// import saim from "../../public/saim.jpeg";
import saim from "../../public/saim1.jpeg";
import saeed from "../../public/saeed.jpeg";
import ibtesam from "../../public/ibtesam.jpeg"
import ehtisham from "../../public/ehtisham.jpeg"

const teamMembers = [
  {
    name: "Saim Zaidi",
    title: "Founder & CEO",
    image:saim,
    linkedin: "#",
    link: "#",
  },
  {
    name: "Saeed Ansari",
    title: "Lead Designer",
    image: saeed,
    linkedin: "#",
    link: "#",  // added link here to show arrow icon
  },
  {
    name: "Ibtesam",
    title: "CTO",
    image: ibtesam,
    linkedin: "#",
    link: "#",
  },
  
  {
    name: "Ehtisham",
    title: "Community Manager",
    image: ehtisham,
    linkedin: "#",
    link: "#",  // added default link
  },

];

export default function TeamSection() {
  return (
        <>
        <NavbarComponent/>
      <div className="pt-20 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
        {teamMembers.map((member, index) => (
          <div
          key={index}
          className="w-[280px] h-[400px] rounded-2xl p-6 flex flex-col justify-end border border-white/10 hover:shadow-2xl transition relative"
          style={{
              backgroundImage: `url(${member.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-58 rounded-b-2xl"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,5), transparent)",
                }}
            />

            {/* Text container above the gradient */}
            <div className="relative z-10 text-center mb-4">
              <h3 className="text-[#d5a351] text-lg font-bold tracking-wide">{member.name}</h3>
              <p className="text-[#d5a351] text-sm mt-1 font-bold">{member.title}</p>
            </div>

            {/* Social Icons */}
            <div className="relative z-10 flex gap-4 justify-center">
              {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#d5a351] p-2 rounded-full hover:bg-yellow-400 cursor-pointer">
                    <FaLinkedinIn className="text-white w-4 h-4" />
                  </div>
                </a>
              )}
              {/* Right arrow icon added for every member, fallback to "#" if no link */}
              <a href={member.link ?? "#"} target="_blank" rel="noopener noreferrer">
                <div className="bg-[#d5a351] p-2 rounded-full hover:bg-yellow-400 cursor-pointer">
                  <ArrowRight className="text-white w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}