import React, { useEffect, useState } from "react";
import { getAllCourses } from "../core/api/courseApi";
import { Box2 } from "../card/Box2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiTv,
  FiX,
} from "react-icons/fi";
import { FaTv } from "react-icons/fa";

export const TVshow = () => {
  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getmovie = async () => {
    setLoading(true);
    try {
      const results = await getAllCourses();
      const tvShows = results.filter(
        (item) => item.type && item.type.toLowerCase().includes("tv_show"),
      );
      setMovie(tvShows.length > 0 ? tvShows : results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmovie();
  }, []);

  // Filter and search
  const filteredTVshows = movie.filter(
    (item) =>
      (item.title || item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.genre)
        ? item.genre.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        : (item.genre || item.category || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTVshows?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredTVshows?.length / itemsPerPage);

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent px-4 md:px-8 lg:px-12 py-6 md:py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex flex-wrap items-center gap-2 sm:gap-3">
                <FaTv className="text-red-500" />
                TV Shows
                <span className="text-xs sm:text-sm text-gray-500 bg-white/5 px-2.5 sm:px-3 py-1 rounded-full border border-white/10">
                  {filteredTVshows?.length || 0} shows
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Explore our TV show collection
              </p>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Found {filteredTVshows?.length || 0} results
              </div>
            )}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
              type="text"
              placeholder="Search TV shows by title or genre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <p className="text-gray-400 text-sm">
            Showing {currentItems?.length || 0} of{" "}
            {filteredTVshows?.length || 0} TV shows
          </p>
          {filteredTVshows?.length > 0 && (
            <p className="text-gray-500 text-sm">
              Page {currentPage} of {totalPages || 1}
            </p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
            <p className="text-gray-400 text-sm animate-pulse">
              Loading TV shows...
            </p>
          </div>
        ) : (
          <>
            {/* TV Shows Grid */}
            {currentItems?.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5 md:gap-6"
              >
                <AnimatePresence>
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={item.id || index}
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
                  <FiTv className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-400 text-xl">No TV shows found</p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm
                    ? `No shows match "${searchTerm}"`
                    : "No TV shows available"}
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
          </>
        )}

        {/* Pagination */}
        {!loading && currentItems?.length > 0 && totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[40px] h-10 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20"
                        : "bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/30"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-gray-500 self-end px-1">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="min-w-[40px] h-10 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/30 transition-all duration-300"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Footer Stats */}
        {!loading && currentItems?.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            {filteredTVshows?.length || 0} total TV shows • Page {currentPage}{" "}
            of {totalPages || 1}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
