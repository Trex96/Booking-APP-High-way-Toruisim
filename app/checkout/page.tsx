"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoValidation, setPromoValidation] = useState<{isValid: boolean | null, message: string, discount?: {type: string, value: number}}>({isValid: null, message: ""});
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  useEffect(() => {
    const bookingData = sessionStorage.getItem("booking");
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleApplyPromo = async () => {
    // Clear previous validation
    setPromoValidation({isValid: null, message: ""});
    
    if (!promoCode.trim()) {
      setPromoValidation({isValid: false, message: "Please enter a promo code"});
      return;
    }

    setIsApplyingPromo(true);
    
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPromoValidation({
          isValid: true, 
          message: `Promo code applied! Discount: ${data.discountValue}${data.discountType === 'percentage' ? '%' : '₹'}`,
          discount: {type: data.discountType, value: data.discountValue}
        });
      } else {
        setPromoValidation({isValid: false, message: data.error || "Invalid promo code"});
      }
    } catch (err) {
      console.error("Error applying promo code:", err);
      setPromoValidation({isValid: false, message: "Failed to apply promo code. Please try again."});
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert("Please agree to the terms and safety policy");
      return;
    }
    
    if (!fullName || !email) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        ...booking,
        fullName,
        email,
        promoCode: promoCode || null
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("refId", data.refId);
        router.push("/confirmation");
      } else {
        setError(data.error || "Failed to create booking");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-6 xs:py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/details/${booking?.experienceId}`}
            className="flex items-center gap-2 text-gray-700 mb-4 xs:mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="text-sm xs:text-base">Back to Experience</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <label className="block text-sm xs:text-base text-gray-600 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm xs:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm xs:text-base text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm xs:text-base"
                    required
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col xs:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        // Clear validation when user types
                        if (promoValidation.isValid !== null) {
                          setPromoValidation({isValid: null, message: ""});
                        }
                      }}
                      placeholder="Promo code"
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10 text-sm xs:text-base"
                    />
                    {(promoValidation.isValid === true || promoValidation.isValid === false) && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {promoValidation.isValid === true ? (
                          <svg className="h-4 w-4 xs:h-5 xs:w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 xs:h-5 xs:w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="min-h-[20px] xs:min-h-[24px] mt-1">
                    {promoValidation.isValid === true && (
                      <motion.div 
                        className="text-green-600 text-xs xs:text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {promoValidation.message}
                      </motion.div>
                    )}
                    {promoValidation.isValid === false && (
                      <motion.div 
                        className="text-red-500 text-xs xs:text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {promoValidation.message}
                      </motion.div>
                    )}
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className={`px-4 xs:px-6 py-2.5 xs:py-6 flex items-center  h-4 w-auto bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors whitespace-nowrap text-sm xs:text-base ${
                    isApplyingPromo ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isApplyingPromo ? { scale: 1.05 } : {}}
                  whileTap={!isApplyingPromo ? { scale: 0.95 } : {}}
                >
                  {isApplyingPromo ? (
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 xs:w-4 xs:h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-1 xs:mr-2"></div>
                      <span>Applying</span>
                    </div>
                  ) : (
                    "Apply"
                  )}
                </motion.button>
              </motion.div>

              <motion.div 
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-black"
                />
                <label htmlFor="terms" className="text-xs xs:text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </motion.div>

              {error && (
                <motion.div 
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 xs:py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm xs:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Pay and Confirm Booking"
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-gray-50 p-4 xs:p-6 rounded-lg sticky top-4">
              <motion.h2 
                className="text-lg xs:text-xl font-semibold mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Order Summary
              </motion.h2>
              <div className="space-y-3 xs:space-y-4">
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="text-gray-600 text-sm">Experience</span>
                  <span className="font-medium text-sm xs:text-base">{booking.experienceTitle}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <span className="text-gray-600 text-sm">Date</span>
                  <span className="text-sm">{booking.date}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <span className="text-gray-600 text-sm">Time</span>
                  <span className="text-sm">{booking.time}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-gray-600 text-sm">Qty</span>
                  <span className="text-sm">{booking.quantity}</span>
                </motion.div>

                <motion.div 
                  className="border-t border-gray-300 pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="text-sm">₹{booking.subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-3 xs:mb-4">
                    <span className="text-gray-600 text-sm">Taxes</span>
                    <span className="text-sm">₹{booking.taxes}</span>
                  </div>
                  {promoValidation.isValid === true && promoValidation.discount && (
                    <motion.div 
                      className="flex justify-between mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="text-gray-600 text-sm">Discount</span>
                      <span className="text-green-600 text-sm">
                        -₹{promoValidation.discount.type === 'percentage' 
                          ? Math.round(booking.subtotal * (promoValidation.discount.value / 100))
                          : promoValidation.discount.value}
                      </span>
                    </motion.div>
                  )}
                  <motion.div 
                    className="flex justify-between text-lg font-bold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, type: "spring" }}
                  >
                    <span>Total</span>
                    <span>
                      ₹{promoValidation.isValid === true && promoValidation.discount 
                        ? promoValidation.discount.type === 'percentage'
                          ? booking.total - Math.round(booking.subtotal * (promoValidation.discount.value / 100))
                          : booking.total - promoValidation.discount.value
                        : booking.total}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}