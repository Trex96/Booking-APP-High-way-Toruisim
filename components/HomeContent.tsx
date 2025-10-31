"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TimeSlot {
  time: string;
  available: number;
  soldOut?: boolean;
  _id?: string; // Optional since it might not be present in all cases
}

interface DateSlot {
  date: string;
  available: number;
  times: TimeSlot[];
  _id?: string; // Optional since it might not be present in all cases
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
  _id?: string; // Optional MongoDB field
  createdAt?: string; // Optional MongoDB field
  updatedAt?: string; // Optional MongoDB field
  __v?: number; // Optional MongoDB field
}

interface HomeContentProps {
  query: string | undefined;
}

export default function HomeContent({ query }: HomeContentProps) {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log("HomeContent - Component rendered with props:", { 
    query, 
    queryType: typeof query 
  });
  
  // Fetch experiences when component mounts
  useEffect(() => {
    console.log("HomeContent - useEffect triggered, fetching experiences");
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch experiences from API
        console.log("HomeContent - Making API request to /api/experiences");
        const res = await fetch(`/api/experiences`, { 
          cache: 'no-store'
        });
        
        console.log("HomeContent - API response status:", res.status);
        
        if (res.ok) {
          const apiExperiences = await res.json();
          console.log("HomeContent - Fetched experiences from API:", apiExperiences.length);
          console.log("HomeContent - First experience:", apiExperiences[0]?.title);
          
          // Convert API response to match the expected interface
          const convertedExperiences: Experience[] = apiExperiences.map((exp: any) => ({
            id: exp.id,
            title: exp.title,
            location: exp.location,
            price: exp.price,
            image: exp.image,
            description: exp.description,
            about: exp.about,
            dates: exp.dates.map((dateSlot: any) => ({
              date: dateSlot.date,
              available: dateSlot.available,
              times: dateSlot.times.map((timeSlot: any) => ({
                time: timeSlot.time,
                available: timeSlot.available,
                soldOut: timeSlot.soldOut
              }))
            }))
          }));
          
          console.log("HomeContent - Converted experiences:", convertedExperiences.length);
          setExperiences(convertedExperiences);
        } else {
          console.log("HomeContent - Failed to fetch experiences from API:", res.status);
          setError('Failed to load experiences');
          setExperiences([]);
        }
      } catch (error) {
        console.error('HomeContent - Error fetching experiences:', error);
        setError('Error loading experiences');
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, []); // Empty dependency array means this runs once on mount
  
  // Show all experiences when query is undefined (no search) or empty string (cleared search)
  const filteredExperiences = query !== undefined && query.trim() !== ""
    ? experiences.filter(
        (exp) => {
          const searchTerm = query.toLowerCase().trim();
          const matches = (
            exp.title.toLowerCase().includes(searchTerm) ||
            exp.location.toLowerCase().includes(searchTerm) ||
            exp.description.toLowerCase().includes(searchTerm)
          );
          console.log("HomeContent - Filtering experience:", { 
            title: exp.title, 
            searchTerm, 
            matches 
          });
          return matches;
        }
      )
    : experiences;
  
  console.log("HomeContent - Filtered experiences:", { 
    originalCount: experiences.length, 
    filteredCount: filteredExperiences.length,
    query
  });

  const handleViewAll = () => {
    // Clear search and show all experiences
    console.log("HomeContent - handleViewAll clicked, redirecting to home");
    router.push("/");
    // Reload the page to trigger data fetch
    window.location.reload();
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <main className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-6 xs:py-8">
        {query === undefined && (
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
                onClick={handleViewAll}
              >
                Explore Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 xs:px-8 py-2 xs:py-3 bg-white text-black border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition-colors"
                onClick={handleViewAll}
              >
                View All
              </motion.button>
            </motion.div>
          </motion.div>
        )}

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
        {filteredExperiences.length === 0 && query !== undefined && query.trim() !== "" && (
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