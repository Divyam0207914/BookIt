"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Logo from "../../../../public/Logo.png";

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  about?: string;
  availableSlots: {
    date: string;
    time: string;
    booked: boolean;
  }[];
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [exp, setExp] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/experiences/${id}`)
      .then((res) => setExp(res.data))
      .catch((err) => console.error("Error fetching experience:", err));
  }, [id]);

  if (!exp)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-yellow-400 mb-4"></div>
          <p className="text-slate-600 text-lg">Loading experience...</p>
        </div>
      </div>
    );

  const TAX_AMOUNT = 60;
  const subtotal = exp.price * quantity;
  const total = subtotal + TAX_AMOUNT;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time slot");
      return;
    }
    router.push(
      `/checkout?experienceId=${exp._id}&date=${selectedDate}&time=${selectedTime}&quantity=${quantity}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="lg:col-span-2 bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
          <div className="relative">
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          
          <div className="p-5 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {exp.title}
            </h1>
            <p className="text-slate-700 mb-6 leading-relaxed">{exp.description}</p>

            <div className="mb-6">
              <h2 className="font-bold text-slate-800 mb-3 text-lg">Choose Date</h2>
              <div className="flex flex-wrap gap-3">
                {Array.from(new Set(exp.availableSlots.map((s) => s.date))).map(
                  (date, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime("");
                      }}
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                        selectedDate === date
                          ? "bg-yellow-400 text-slate-900 border-yellow-400 shadow-md"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-yellow-50 hover:border-yellow-300"
                      }`}
                    >
                      {date}
                    </button>
                  )
                )}
              </div>
            </div>

            {selectedDate && (
              <div className="mb-6">
                <h2 className="font-bold text-slate-800 mb-3 text-lg">Choose Time</h2>
                <div className="flex flex-wrap gap-3">
                  {exp.availableSlots
                    .filter((slot) => slot.date === selectedDate)
                    .map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={slot.booked}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                          slot.booked
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "bg-yellow-400 text-slate-900 border-yellow-400 shadow-md"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-yellow-50 hover:border-yellow-300"
                        }`}
                      >
                        {slot.time}
                        {slot.booked && (
                          <span className="ml-2 text-xs">(Booked)</span>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 text-lg">About This Experience</h3>
              <p className="text-slate-700 leading-relaxed">
                {exp.about ||
                  "Scenic routes, trained guides, and safety briefing included. Minimum age 12. All necessary equipment provided for your safety and comfort."}
              </p>
            </div>
          </div>
        </div>

        <aside className="bg-white shadow-lg rounded-xl p-5 sm:p-6 h-fit border border-slate-200 sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Booking Summary
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-slate-700">
              <span className="font-medium">Price per person</span>
              <span className="font-semibold text-slate-900">₹{exp.price.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Quantity</span>
              <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-bold transition-all ${
                    quantity <= 1
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white text-slate-700 hover:bg-yellow-400 hover:text-slate-900 shadow-sm"
                  }`}
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-md bg-white text-slate-700 hover:bg-yellow-400 hover:text-slate-900 flex items-center justify-center font-bold shadow-sm transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="font-medium">Taxes & Fees</span>
              <span className="font-semibold text-slate-900">₹{TAX_AMOUNT}</span>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-slate-200 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-slate-900">Total Amount</span>
              <span className="font-bold text-2xl text-yellow-600">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="bg-yellow-400 text-slate-900 w-full py-3.5 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Confirm Booking
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            You won&apos;t be charged yet
          </p>
        </aside>
      </main>
    </div>
  );
}