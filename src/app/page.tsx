"use client";

import { Menu, X, Sparkles, Zap, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/Logo.png"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleExplore = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-800">
      
      <header className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Highway Delite Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-800">
            BOOKIT
          </h1>
        </div>

        
        <div className="hidden sm:flex gap-3">
          <button
            onClick={handleLogin}
            className="px-4 lg:px-5 py-2 border-2 border-gray-800 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-4 lg:px-5 py-2 bg-yellow-400 rounded-full text-black font-semibold hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </div>

        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

       
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg sm:hidden">
            <div className="flex flex-col gap-3 p-4">
              <button
                onClick={handleLogin}
                className="w-full px-5 py-2 border-2 border-gray-800 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="w-full px-5 py-2 bg-yellow-400 rounded-full text-black font-semibold hover:bg-yellow-500 transition"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      
      <section className="relative flex flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden">
    
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Scenic Highway Adventure"
            fill
            className="object-cover brightness-75"
            priority
          />
          
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        </div>

        
        <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 px-4">
            Discover. Explore. Experience.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-800 max-w-2xl mx-auto font-medium px-4">
            Find handpicked adventures across India — from sunset kayaking to
            mountain hikes. Your next experience begins here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 px-4">
            <button
              onClick={handleExplore}
              className="px-7 py-3.5 bg-yellow-400 text-black rounded-full font-bold text-base hover:bg-yellow-500 transition shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Explore Experiences
            </button>
            <button
              onClick={handleRegister}
              className="px-7 py-3.5 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-base hover:bg-gray-100 transition shadow-md"
            >
              Join as a Traveler
            </button>
          </div>
        </div>
      </section>

    
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-20 bg-white text-center border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-gray-900">
          Why Choose BOOKIT?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-black" size={24} />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Curated Experiences
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every trip is verified for safety, quality, and authenticity by
              our trusted local partners.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-black" size={24} />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Seamless Booking
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Book instantly with secure payment options and instant
              confirmations.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-black" size={24} />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Local Expertise
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Travel with local guides who know every hidden trail and story.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-gray-500 text-xs sm:text-sm border-t border-gray-200 mt-auto">
        © {new Date().getFullYear()} BOOKIT. All rights reserved.
      </footer>
    </div>
  );
}
