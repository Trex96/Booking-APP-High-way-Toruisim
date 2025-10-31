"use client";

import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const params = searchParams;
    if (params) {
      setSearchQuery(params.get("q") || "");
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
    // Close mobile menu after search
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL with search query or empty query when cleared
    if (!value.trim()) {
      // When search is cleared, show all experiences by setting empty query
      router.push("/?q=", { scroll: false });
    } else {
      router.push(`/?q=${encodeURIComponent(value.trim())}`, { scroll: false });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-3 xs:py-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-2 xs:gap-4"
        >
          {/* Logo section - responsive for all screen sizes */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-1 xs:gap-2">
              <div className="bg-black rounded-full p-1.5 xs:p-2">
                <MapPin className="w-4 h-4 xs:w-5 xs:h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base xs:text-lg font-bold">Highway delite</span>
                <span className="text-base xs:text-lg font-bold"></span>
              </div>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>

          {/* Search form - hidden on mobile when menu closed */}
          <motion.form 
            onSubmit={handleSearch} 
            className={`${isMenuOpen ? 'block absolute top-full left-0 w-full bg-white p-4 border-b border-gray-200 md:static md:block md:p-0 md:border-0 md:bg-transparent md:w-auto' : 'hidden'} md:flex gap-2 flex-1 max-w-2xl`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search experiences"
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <motion.button
              type="submit"
              className="px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors mt-2 md:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden xs:inline">Search</span>
              <Search className="inline xs:hidden w-4 h-4" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </header>
  );
}