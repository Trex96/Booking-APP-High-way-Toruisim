"use client";

import Link from "next/link";
import Image from "next/image";
import { Experience } from "@/lib/data";
import { motion } from "framer-motion";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
    >
      <div className="relative w-full aspect-video bg-gray-200">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width: 475px) 90vw, (max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover"
        />
      </div>
      <motion.div 
        className="p-3 xs:p-4"
        whileHover={{ backgroundColor: "#f9fafb" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-2">
          <motion.h3 
            className="text-base xs:text-lg font-semibold line-clamp-1"
            whileHover={{ color: "#000" }}
          >
            {experience.title}
          </motion.h3>
          <motion.span 
            className="text-xs bg-gray-200 px-1.5 py-0.5 xs:px-2 xs:py-1 rounded text-gray-700 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            {experience.location}
          </motion.span>
        </div>
        <motion.p 
          className="text-xs xs:text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {experience.description}
        </motion.p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs xs:text-sm text-gray-600">From </span>
            <span className="text-base xs:text-lg font-semibold">₹{experience.price}</span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/details/${experience.id}`}
              className="px-3 py-1.5 xs:px-4 xs:py-2 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors text-xs xs:text-sm"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}