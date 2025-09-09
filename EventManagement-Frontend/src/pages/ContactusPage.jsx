import React, { useState } from 'react'
import NavbarComponent from '../component/NavbarComponent'
import FooterComponent from '../component/FooterComponent'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Mail, Phone, MapPin, MessageCircle, Send, Tag } from 'lucide-react'

export default function ContactusPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            console.log(formData)
            const res = await axios.post("http://localhost:3000/api/contact", formData);
            if (res.data.success) {
                toast.success("✅ Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", company: "", message: "" });
            }
        } catch (error) {
            toast.error("❌ Failed to send message. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <NavbarComponent />
            
            {/* Combined Banner and Form Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                {/* Banner Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                        alt="EventSphere Contact Banner"
                        className="w-full h-full object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-[#625FFF]/90 to-[#9813FA]/90"></div> */}
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header Text */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get in <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-100">
                            We'd love to hear from you. Whether you have questions, feedback, or event needs.
                        </p>
                        <div className="mt-6">
                            <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white items-center">
                                <Tag className="w-4 h-4 mr-2" />
                                Quick response guaranteed
                            </div>
                        </div>
                    </div>

                    {/* Form and Contact Info Card */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Contact Form */}
                            <div className="lg:col-span-3 p-8 sm:p-10">
                                <div className="text-center lg:text-left mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start">
                                        <MessageCircle className="h-8 w-8 text-purple-600 mr-3" />
                                        Send us a message
                                    </h2>
                                    <p className="mt-2 text-gray-600">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your name *
                                            </label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your email *
                                            </label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone number
                                            </label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company name
                                            </label>
                                            <input 
                                                type="text" 
                                                name="company" 
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your company name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-vertical"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white py-4 rounded-xl font-semibold hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gradient-to-b from-purple-50 to-blue-50 lg:col-span-2 p-8 sm:p-10">
                                <div className="h-full flex flex-col">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                            <MessageCircle className="h-6 w-6 text-purple-600 mr-2" />
                                            Contact info
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div className="bg-purple-100 p-3 rounded-lg">
                                                    <MapPin className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-900">Address</h4>
                                                    <p className="text-gray-600 mt-1">8502 Preston Rd. Inglewood, Maine 98380, USA</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="bg-blue-100 p-3 rounded-lg">
                                                    <Mail className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                                    <p className="text-gray-600 mt-1">saimzaidi110786@gmail.com</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="bg-green-100 p-3 rounded-lg">
                                                    <Phone className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                                    <p className="text-gray-600 mt-1">0333-2133927</p>
                                                    <p className="text-gray-600">0324-1246457</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="mt-12 pt-8 border-t border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow us on</h4>
                                        <div className="flex space-x-4">
                                            {[
                                                {
                                                    name: "LinkedIn",
                                                    href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
                                                    icon: <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23h4V7h-4v16zM8 7h3.6v2.2h.1c.5-.9 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6v10h-4v-9c0-2.2-.8-3.6-2.7-3.6-1.5 0-2.4 1-2.8 2-.1.2-.1.5-.1.8v9.8H8V7z" />
                                                },
                                                {
                                                    name: "Facebook",
                                                    href: "https://www.facebook.com/saim.zaidi.3994",
                                                    icon: <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                                },
                                                {
                                                    name: "Instagram",
                                                    href: "https://www.instagram.com/saimzaidi1470/",
                                                    icon: <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                                },
                                                {
                                                    name: "GitHub",
                                                    href: "https://github.com/saimzaidi110",
                                                    icon: <path fillRule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 1.6 3.4 2.2.2-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.4.1-2.8 0 0 1-.3 3.3 1.2a11.2 11.2 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.4.2 2.5.1 2.8.7.8 1.2 1.9 1.2 3.2 0 4.7-2.7 5.7-5.3 6 .4.3.7.9.7 1.8v2.7c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" clipRule="evenodd" />
                                                }
                                            ].map((social) => (
                                                <a
                                                    key={social.name}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 shadow-sm"
                                                    title={social.name}
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                        {social.icon}
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterComponent />
        </div>
    )
}