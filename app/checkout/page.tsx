"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

export default function CheckoutPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const bookingData = sessionStorage.getItem("booking");
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleApplyPromo = () => {
    alert("Promo code functionality not implemented in this demo");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and safety policy");
      return;
    }
    if (!fullName || !email) {
      alert("Please fill in all required fields");
      return;
    }

    const refId = "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase() + "SO";
    sessionStorage.setItem("refId", refId);
    router.push("/confirmation");
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Checkout</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-black"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>

              <button
                type="submit"
                className="hidden"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{booking.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span>{booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span>{booking.quantity}</span>
                </div>

                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{booking.subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Taxes</span>
                    <span>₹{booking.taxes}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{booking.total}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors"
                >
                  Pay and Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
