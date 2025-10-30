"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/Logo.png";

export default function ConfirmationPage() {
  const [refId, setRefId] = useState("");

  useEffect(() => {
    
    const randomRef = "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefId(randomRef);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-4">

          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <Image
                src={Logo}
                alt="Highway Delite Logo"
                width={44}
                height={44}
                className="rounded-full ring-2 ring-yellow-400/20"
                priority
              />
            </div>
            <span className="font-bold text-slate-800 text-xl tracking-tight">
              BOOKIT
            </span>
          </Link>


          <div className="flex items-center w-full sm:w-auto sm:max-w-md gap-2">
            <div className="relative flex-1 sm:flex-auto">
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="bg-yellow-400 text-slate-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-yellow-500 transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-500 rounded-full p-4 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-slate-600 mb-6">
            Your experience has been successfully booked
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-slate-600 mb-1">Booking Reference ID</p>
            <p className="text-2xl font-bold text-slate-900 tracking-wider font-mono">
              {refId}
            </p>
          </div>

          

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/home"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              Back to Home
            </Link>
            
          </div>
        </div>

      
        <div className="mt-8 text-center max-w-md">
          <p className="text-sm text-slate-500">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@bookit.com" className="text-yellow-600 hover:text-yellow-700 font-medium">
              support@bookit.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}