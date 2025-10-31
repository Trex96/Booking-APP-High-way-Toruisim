"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = searchParams;
    if (params) {
      // Update searchQuery when URL changes
      const query = params.get("q");
      console.log("Header useEffect - URL search params changed:", { query, params: Object.fromEntries(params.entries()) });
      setSearchQuery(query !== null ? query : "");
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Header handleSearch - Search submitted:", { searchQuery, trimmed: searchQuery.trim() });
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Header handleInputChange - Input value changed:", { value, trimmed: value.trim() });
    setSearchQuery(value);
    
    // Update URL with search query or clear query when empty
    if (!value.trim()) {
      // When search is cleared, go back to home page to show all experiences
      console.log("Header handleInputChange - Search cleared, redirecting to home");
      router.push("/", { scroll: false });
    } else {
      console.log("Header handleInputChange - Updating URL with search query");
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
            <Link href="/" className="flex items-center gap-2 xs:gap-3">
              <div className="relative w-12 h-12 xs:w-20 xs:h-10">
                <Image 
                  src="/images/logo.png" 
                  alt="Highway Delite Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Search form - hidden on mobile when menu closed */}
          <motion.form 
            onSubmit={handleSearch} 
            className="md:flex gap-2 flex-1 max-w-2xl"
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