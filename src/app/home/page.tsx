"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/Logo.png";

interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
}

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/experiences");
        if (res.status === 200) {
          setExperiences(res.data);
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    fetchExperiences();
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
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
          </div>

          <div className="flex items-center w-full sm:w-auto sm:max-w-md gap-2">
            <div className="relative flex-1 sm:flex-auto">
              <input
                type="text"
                placeholder="Search experiences..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border placeholder:text-slate-400 border-slate-300 text-slate-900 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-800 tracking-tight">
            Explore Amazing Experiences
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover curated adventures with certified guides and premium safety standards
          </p>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 mb-4">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-lg">No experiences found.</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExperiences.map((exp) => (
              <div
                key={exp._id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    📍 {exp.location}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                    {exp.title}
                  </h2>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Curated small-group experience. Certified guide. Safety first
                    with gear included.
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Starting from</p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">
                        <span className="text-yellow-600">₹{exp.price.toLocaleString()}</span>
                      </p>
                    </div>
                    <Link href={`/experience/${exp._id}`}>
                      <button className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-slate-900 font-semibold px-4 sm:px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}