"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const experienceId = searchParams.get("experienceId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  const [exp, setExp] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (experienceId) {
      axios
        .get(`/api/experiences/${experienceId}`)
        .then((res) => {
          setExp(res.data);
          setTotalPrice(res.data.price * quantity + 60);
        })
        .catch((err) => {
          console.error("Error fetching experience:", err);
          setError("Failed to load experience details");
        });
    }
  }, [experienceId, quantity]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setApplyingPromo(true);
    setError("");

    try {
      const res = await axios.post("/api/promo/validate", { code: promoCode });
      const data = res.data;

      if (data.valid) {
        let discountAmount = 0;

        if (data.type === "percent") {
          discountAmount = Math.round(subtotal * data.discount);
        } else {
          discountAmount = data.discount;
        }

        const newTotal = subtotal + taxesFees - discountAmount;
        setDiscount(discountAmount);
        setTotalPrice(newTotal);
        setPromoApplied(true);
      } else {
        setError(data.message || "Invalid promo code");
      }
    } catch (error: any) {
      console.error("Promo error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to validate promo code. Please try again."
      );
    } finally {
      setApplyingPromo(false);
    }
  };

  const handleConfirm = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!date || !time) {
      setError("Missing date or time");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/bookings", {
        experienceId,
        name,
        email,
        date,
        time,
        quantity,
        totalPrice,
        promoCode: promoApplied ? promoCode : "",
      });

      if (res.data.success) {
        router.push("/result");
      }
    } catch (error: any) {
      console.error("Error confirming booking:", error);

      if (
        error.response?.status === 409 ||
        error.response?.data?.message?.includes("already booked")
      ) {
        setError(
          "This time slot is already booked. Please select a different time."
        );
      } else if (error.response?.status === 400) {
        setError(
          error.response?.data?.message ||
            "Invalid booking details. Please check your information."
        );
      } else {
        setError(
          "Unable to complete booking. Please try again or contact support."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!exp && !error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experience details...</p>
        </div>
      </div>
    );

  if (error && !exp)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  const subtotal = exp.price * quantity;
  const taxesFees = 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Booking
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Experience Details
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full sm:w-48 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {date}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {time}
                      </div>
                      <div className="flex items-center text-gray-700 font-semibold">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {quantity} {quantity === 1 ? "Person" : "People"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border text-slate-900 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border text-slate-900 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg text-slate-900 font-semibold text-gray-900 mb-4">
                Promo Code
              </h2>
              <div className="flex gap-2 text-slate-900">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoApplied(false);
                    setDiscount(0);
                    setTotalPrice(subtotal + taxesFees);
                  }}
                  disabled={promoApplied}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition disabled:bg-gray-100"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={applyingPromo || promoApplied || !promoCode.trim()}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyingPromo ? "..." : promoApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-semibold flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    🎉 Awesome! You saved ₹{discount}
                  </p>
                  <p className="text-green-600 text-xs mt-1 ml-7">
                    Your promo code has been successfully applied to your
                    booking
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Price per person</span>
                  <span>₹{exp.price}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Quantity</span>
                  <span className="font-semibold">× {quantity}</span>
                </div>
                <div className="flex justify-between text-gray-700 pt-2 border-t">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes & Fees</span>
                  <span>₹{taxesFees}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Discount Applied
                    </span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full bg-yellow-400 py-4 rounded-lg text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Confirm & Pay
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
