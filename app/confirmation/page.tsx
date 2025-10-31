"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ConfirmationPage() {
  const router = useRouter();
  const [refId, setRefId] = useState("");

  useEffect(() => {
    const ref = sessionStorage.getItem("refId");
    if (!ref) {
      router.push("/");
    } else {
      setRefId(ref);
    }
  }, [router]);

  if (!refId) {
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
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="bg-green-500 rounded-full p-3 xs:p-4 mb-5 xs:mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2
            }}
          >
            <Check className="w-8 h-8 xs:w-12 xs:h-12 text-white" strokeWidth={3} />
          </motion.div>
          
          <motion.h1 
            className="text-2xl xs:text-3xl font-bold mb-2 xs:mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Booking Confirmed!
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-2 xs:mb-3 text-sm xs:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Ref ID: {refId}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-5 xs:px-6 py-2 xs:py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors text-sm xs:text-base"
            >
              Back to Home
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-6 xs:mt-8 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <p className="text-gray-600 text-sm xs:text-base">
              Thank you for your booking! You will receive a confirmation email shortly.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}