import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { MessageCircle, Menu, X } from 'lucide-react'

export default function NavbarComponent() {
    const { user, userlogout } = useContext(UserContext)
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const HandleLogout = () => {
        userlogout()
        navigate('/')
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div>
            <header 
                className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled 
                    ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' 
                    : 'bg-gradient-to-r from-[#625FFF] to-[#9813FA]'
                }`}
            >
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <Link to="/" title="" className={`flex text-xl font-bold ${
                                isScrolled 
                                ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent' 
                                : 'text-white'
                            }`}>
                                EventSphere
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-4">
                            <Link to="/" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Home </Link>
                            <Link to="/blog" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Blog </Link>
                            <Link to="/events" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Events </Link>
                            <Link to="/exhibitor" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Exhibitors </Link>
                            <Link to="/eventschedules" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Schedules </Link>
                            <Link to="/contact" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> Contact Us </Link>
                            <Link to="/about" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                isScrolled 
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                : 'text-white hover:bg-white/20'
                            }`}> About Us </Link>
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            {!user ? (
                                <>
                                    <Link to="/login" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg ${
                                        isScrolled 
                                        ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                        : 'text-white hover:bg-white/20'
                                    }`}> Log in </Link>
                                    <Link to="/signup" title="" className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
                                        isScrolled 
                                        ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white hover:from-[#4F4BFF] hover:to-[#7A0FDA]' 
                                        : 'bg-white text-gray-900 hover:bg-gray-100'
                                    }`} role="button"> Sign Up </Link>
                                </>
                            ) : (
                                <>
                                    {/* Chat Icon */}
                                    <button
                                        onClick={() => navigate('/chat')}
                                        className={`p-2 rounded-full ${
                                            isScrolled 
                                            ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white hover:from-[#4F4BFF] hover:to-[#7A0FDA]' 
                                            : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`}
                                        title="Chat"
                                    >
                                        <MessageCircle size={20} />
                                    </button>
                                    <button 
                                        className={`px-4 py-2 rounded-lg ${
                                            isScrolled 
                                            ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white hover:from-[#4F4BFF] hover:to-[#7A0FDA]' 
                                            : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`} 
                                        onClick={HandleLogout}
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center lg:hidden">
                            {user && (
                                <button
                                    onClick={() => navigate('/chat')}
                                    className={`p-2 mr-3 rounded-full ${
                                        isScrolled 
                                        ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white' 
                                        : 'bg-white text-gray-900'
                                    }`}
                                    title="Chat"
                                >
                                    <MessageCircle size={20} />
                                </button>
                            )}
                            
                            <button 
                                type="button" 
                                className={`inline-flex p-2 transition-all duration-200 rounded-md ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`}
                                onClick={toggleMobileMenu}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className={`lg:hidden rounded-lg mt-2 py-4 ${
                            isScrolled 
                            ? 'bg-white shadow-lg' 
                            : 'bg-gradient-to-b from-[#625FFF] to-[#9813FA]'
                        }`}>
                            <div className="flex flex-col space-y-3 px-4">
                                <Link to="/" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Home </Link>
                                <Link to="/blog" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Blog </Link>
                                <Link to="/events" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Events </Link>
                                <Link to="/exhibitor" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Exhibitors </Link>
                                <Link to="/eventschedules" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Schedules </Link>
                                <Link to="/contact" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> Contact Us </Link>
                                <Link to="/about" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center ${
                                    isScrolled 
                                    ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                    : 'text-white hover:bg-white/20'
                                }`} onClick={toggleMobileMenu}> About Us </Link>
                                
                                {!user ? (
                                    <>
                                        <Link to="/login" title="" className={`text-base transition-all duration-200 px-3 py-2 rounded-lg text-center mt-2 ${
                                            isScrolled 
                                            ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#625FFF] hover:to-[#9813FA] hover:text-white' 
                                            : 'text-white hover:bg-white/20'
                                        }`} onClick={toggleMobileMenu}> Log in </Link>
                                        <Link to="/signup" title="" className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg text-center mt-2 ${
                                            isScrolled 
                                            ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white' 
                                            : 'bg-white text-gray-900'
                                        }`} onClick={toggleMobileMenu} role="button"> Sign Up </Link>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-3 mt-4">
                                        <button 
                                            className={`px-4 py-2 rounded-lg text-center ${
                                                isScrolled 
                                                ? 'bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white' 
                                                : 'bg-white text-gray-900'
                                            }`} 
                                            onClick={() => { HandleLogout(); toggleMobileMenu(); }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>
            
            {/* Add padding to the top of your page content to account for fixed navbar */}
            <div className="h-16 lg:h-20"></div>
        </div>
    )
}