import React, { useEffect, useState } from "react";
import { getAllCourses } from "../core/api/courseApi";
import { Box2 } from "../card/Box2";
import { Audio } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowLeft, 
  FaArrowRight,
  FaFilm,
  FaSearch
} from "react-icons/fa";

function Showall() {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await getAllCourses();
      setBlog(results);
      const startIndex = (currentPage - 1) * itemsPerPage;
      setDisplayItems(
        results.data.slice(startIndex, startIndex + itemsPerPage)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter items based on search
  const filteredItems = searchTerm 
    ? allItems.filter(item => 
        (item.title || item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.genre || item.category || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setDisplayItems(filteredItems.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage, filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Audio
          height="180"
          width="80"
          radius="9"
          color="red"
          ariaLabel="loading"
        />
        <p className="text-gray-400 text-sm animate-pulse">Loading content...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent px-4 md:px-8 lg:px-12 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <FaFilm className="text-red-500" />
                All Content
                <span className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 ml-2">
                  {filteredItems.length} items
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Browse our complete collection</p>
            </div>
            
            {/* Result count */}
            {searchTerm && (
              <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Found {filteredItems.length} results
              </div>
            )}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count and page info */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <p className="text-gray-400 text-sm">
            Showing {displayItems.length} of {filteredItems.length} results
          </p>
          {filteredItems.length > 0 && (
            <p className="text-gray-500 text-sm">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </motion.div>

        {/* Items Grid */}
        {displayItems.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            className="flex flex-row flex-wrap justify-center gap-5 md:gap-6"
          >
            <AnimatePresence>
              {displayItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box2 item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-700/30 flex items-center justify-center mb-4">
              <FaFilm className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-xl">No results found</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm 
                ? `No items match "${searchTerm}"` 
                : "No items available"}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && displayItems.length > 0 && (
          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[40px] h-10 rounded-xl transition-all duration-300 ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-red-500 to-purple-500 text-white font-bold shadow-lg shadow-red-500/20"
                        : "bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/30"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <FaArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Footer Stats */}
        {displayItems.length > 0 && (
          <motion.div variants={itemVariants} className="mt-8 text-center text-gray-500 text-sm">
            {filteredItems.length} total items • Page {currentPage} of {totalPages}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Showall;