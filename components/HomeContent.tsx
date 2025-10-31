"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: any[];
}

interface HomeContentProps {
  experiences: Experience[];
  query: string;
}

export default function HomeContent({ experiences, query }: HomeContentProps) {
  const filteredExperiences = query
    ? experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query)
      )
    : experiences;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <main className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-6 xs:py-8">
        {/* Hero Section */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-8 xs:py-12 mb-8 xs:mb-12 relative"
          >
            <motion.h1 
              className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover Amazing <span className="text-primary">Experiences</span>
            </motion.h1>
            <motion.p 
              className="text-lg xs:text-xl text-gray-600 max-w-md xs:max-w-xl sm:max-w-2xl mx-auto mb-6 xs:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Curated small-group adventures with certified guides. Safety first, memories forever.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 xs:px-8 py-2 xs:py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors"
              >
                Explore Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 xs:px-8 py-2 xs:py-3 bg-white text-black border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                View All
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Experiences Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6"
        >
          {filteredExperiences.map((experience) => (
            <motion.div key={experience.id} variants={item}>
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
        {filteredExperiences.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 xs:py-12"
          >
            <p className="text-gray-600">No experiences found matching your search.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}