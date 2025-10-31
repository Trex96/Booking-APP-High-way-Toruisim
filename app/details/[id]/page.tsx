"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";

interface TimeSlot {
  time: string;
  available: number;
  soldOut?: boolean;
}

interface DateSlot {
  date: string;
  available: number;
  times: TimeSlot[];
}

interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: DateSlot[];
}

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch experience data from API
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`/api/experiences/${unwrappedParams.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch experience');
        }
        const data = await res.json();
        setExperience(data);
      } catch (err) {
        setError('Failed to load experience details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [unwrappedParams.id]);

  if (loading) {
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

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  if (!experience) {
    return <div className="min-h-screen flex items-center justify-center">Experience not found</div>;
  }

  const dateSlot = experience.dates[selectedDate];
  const timeSlot = dateSlot.times[selectedTime];
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.059);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    const bookingData = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      date: dateSlot.date,
      time: timeSlot.time,
      quantity,
      subtotal,
      taxes,
      total,
    };
    sessionStorage.setItem("booking", JSON.stringify(bookingData));
    router.push("/checkout");
  };

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
            href="/"
            className="flex items-center gap-2 text-gray-700 mb-4 xs:mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="text-sm xs:text-base">Back to Experiences</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 xs:mb-6"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </motion.div>

            <motion.h1 
              className="text-2xl xs:text-3xl md:text-4xl font-bold mb-3 xs:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {experience.title}
            </motion.h1>
            <motion.p 
              className="text-gray-600 mb-4 xs:mb-6 text-sm xs:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {experience.description}
            </motion.p>

            <motion.div 
              className="mb-5 xs:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg xs:text-xl font-semibold mb-3">Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {experience.dates.map((date, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setSelectedDate(index);
                      setSelectedTime(0);
                    }}
                    className={`px-3 py-1.5 xs:px-4 xs:py-2 rounded-md border text-sm ${
                      selectedDate === index
                        ? "bg-primary border-primary text-black font-medium"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {date.date}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="mb-5 xs:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg xs:text-xl font-semibold mb-3">Choose time</h2>
              <div className="flex gap-2 flex-wrap">
                {dateSlot.times.map((time, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !time.soldOut && setSelectedTime(index)}
                    disabled={time.soldOut}
                    className={`px-3 py-1.5 xs:px-4 xs:py-2 rounded-md border relative text-sm ${
                      selectedTime === index && !time.soldOut
                        ? "bg-primary border-primary text-black font-medium"
                        : time.soldOut
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                    whileHover={!time.soldOut ? { scale: 1.05 } : {}}
                    whileTap={!time.soldOut ? { scale: 0.95 } : {}}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span>{time.time}</span>
                    {!time.soldOut && (
                      <span className="ml-1 xs:ml-2 text-xs text-red-600">
                        {time.available} left
                      </span>
                    )}
                    {time.soldOut && (
                      <span className="ml-1 xs:ml-2 text-xs">sold out</span>
                    )}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </motion.div>

            <motion.div 
              className="mb-5 xs:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-lg xs:text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-600 bg-gray-50 p-3 xs:p-4 rounded-md text-sm xs:text-base">
                {experience.about}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              className="bg-gray-50 p-4 xs:p-6 rounded-lg sticky top-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm xs:text-base">Starts at</span>
                  <motion.span 
                    className="text-xl xs:text-2xl font-semibold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                  >
                    ₹{experience.price}
                  </motion.span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm xs:text-base">Quantity</span>
                  <div className="flex items-center gap-2 xs:gap-3">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 xs:p-1.5 hover:bg-gray-200 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-3 h-3 xs:w-4 xs:h-4" />
                    </motion.button>
                    <span className="font-semibold w-6 xs:w-8 text-center text-sm xs:text-base">{quantity}</span>
                    <motion.button
                      onClick={() =>
                        setQuantity(Math.min(timeSlot.available, quantity + 1))
                      }
                      className="p-1 xs:p-1.5 hover:bg-gray-200 rounded"
                      disabled={quantity >= timeSlot.available}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-3 h-3 xs:w-4 xs:h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="text-sm">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600 text-sm">Taxes</span>
                    <span className="text-sm">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <motion.button
                  onClick={handleConfirm}
                  className="w-full py-2.5 xs:py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors text-sm xs:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}