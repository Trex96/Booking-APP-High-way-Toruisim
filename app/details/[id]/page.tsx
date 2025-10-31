"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { experiences } from "@/lib/data";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const experience = experiences.find((exp) => exp.id === params.id);

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!experience) {
    return <div>Experience not found</div>;
  }

  const dateSlot = experience.dates[selectedDate];
  const timeSlot = dateSlot.times[selectedTime];
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.059);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    const bookingData = {
      experience: experience.title,
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
            <p className="text-gray-600 mb-6">{experience.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {experience.dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(index);
                      setSelectedTime(0);
                    }}
                    className={`px-4 py-2 rounded-md border ${
                      selectedDate === index
                        ? "bg-primary border-primary text-black font-medium"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {date.date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Choose time</h2>
              <div className="flex gap-2 flex-wrap">
                {dateSlot.times.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => !time.soldOut && setSelectedTime(index)}
                    disabled={time.soldOut}
                    className={`px-4 py-2 rounded-md border relative ${
                      selectedTime === index && !time.soldOut
                        ? "bg-primary border-primary text-black font-medium"
                        : time.soldOut
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span>{time.time}</span>
                    {!time.soldOut && (
                      <span className="ml-2 text-xs text-red-600">
                        {time.available} left
                      </span>
                    )}
                    {time.soldOut && (
                      <span className="ml-2 text-xs">sold out</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
                {experience.about}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Starts at</span>
                  <span className="text-xl font-semibold">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(timeSlot.available, quantity + 1))
                      }
                      className="p-1 hover:bg-gray-200 rounded"
                      disabled={quantity >= timeSlot.available}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
