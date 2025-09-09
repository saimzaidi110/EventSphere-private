import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterComponent() {
  return (
    <footer className="bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
                  ES
                </span>
              </div>
              <span className="ml-2 text-xl font-bold">EventSphere</span>
            </div>
            <p className="text-base text-gray-100">
              Discover, explore, and attend the most exciting expos and events with EventSphere.
            </p>
            <div className="flex space-x-6">
              <a  href="https://www.facebook.com/saim.zaidi.3994" className="text-gray-200 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/saimzaidi1470/" className="text-gray-200 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
  
              <a  href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit" className="text-gray-200 hover:text-white transition-colors">
                <span className="sr-only">Linkedin</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23h4V7h-4v16zM8 7h3.6v2.2h.1c.5-.9 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6v10h-4v-9c0-2.2-.8-3.6-2.7-3.6-1.5 0-2.4 1-2.8 2-.1.2-.1.5-.1.8v9.8H8V7z" />
                </svg>
              </a>
              <a href="https://github.com/saimzaidi110" className="text-gray-200 hover:text-white transition-colors">
                <span className="sr-only">Github</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 1.6 3.4 2.2.2-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.4.1-2.8 0 0 1-.3 3.3 1.2a11.2 11.2 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.4.2 2.5.1 2.8.7.8 1.2 1.9 1.2 3.2 0 4.7-2.7 5.7-5.3 6 .4.3.7.9.7 1.8v2.7c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Events</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/events" className="text-base text-gray-100 hover:text-white transition-colors">All Events</Link>
                  </li>
                  <li>
                    <Link to="/eventschedules" className="text-base text-gray-100 hover:text-white transition-colors">Schedules</Link>
                  </li>
                  <li>
                    <Link to="/exhibitor" className="text-base text-gray-100 hover:text-white transition-colors">Exhibitors</Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-100 hover:text-white transition-colors">Blog</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/contact" className="text-base text-gray-100 hover:text-white transition-colors">Contact Us</Link>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-100 hover:text-white transition-colors">Help Center</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">FAQs</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-100 hover:text-white transition-colors">About Us</Link>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Careers</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Press</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Partners</a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Connect</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Newsletter</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Community</a>
                  </li>
                  <li>
                    <a  className="text-base text-gray-100 hover:text-white transition-colors">Testimonials</a>
                  </li>
                  <li>
                    <a className="text-base text-gray-100 hover:text-white transition-colors">Contact Sales</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-purple-400/30 pt-8">
          <p className="text-base text-gray-200 xl:text-center">
            &copy; {new Date().getFullYear()} EventSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}