import { useState, useEffect } from "react";
import { getAllMovies } from "../core/api/courseApi";
import { Audio } from "react-spinners";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Newset from "./Newset";
import Latest from "../Blog/Latest";
import { Link } from "react-router-dom";
import { NewsStyle } from "../card/NewsStyle";
import Hero from "./hero/Hero";
import { Box } from "../card/Box";
import Suggested from "./Suggested/Suggested";
import { motion } from "framer-motion";
import { FaArrowRight, FaFire, FaFilm } from "react-icons/fa";

const List = () => {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getAllMovies();
      setItems(results.slice(1, 6));
      setItems2(results.slice(10, 15));
      setItems3(results.slice(18, 19));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
        <p className="text-gray-400 text-sm animate-pulse">
          Loading amazing content...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-red-400 text-6xl mb-4">⚠️</div>
        <p className="text-red-400 text-xl">{error}</p>
        <button
          onClick={fetchData}
          className="px-6 py-2.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <Hero items={items} items3={items3} />
      </motion.div>

      {/* Main Content */}
      <div className="relative px-4 md:px-8 lg:px-12 -mt-10 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <FaFire className="text-red-500" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          {/* Suggested Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <Suggested items2={items2} title="Suggested For You" />
          </motion.div>

          {/* Newset Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-gradient-to-b from-red-500 to-purple-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Latest Releases
                </h2>
              </div>
              <Link
                to="/showall"
                className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 group"
              >
                View All
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Newset />
          </motion.div>

          {/* Latest Blog Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Latest Articles
                </h2>
                <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Blog
                </span>
              </div>
              <Link
                to="/Blogstyle"
                className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 group"
              >
                Read More
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Latest />
          </motion.div>

          {/* Show More Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center py-8"
          >
            <Link to="/showall">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30 hover:border-red-500/60 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3 text-white font-medium">
                  <FaFilm className="text-red-400 group-hover:rotate-12 transition-transform" />
                  Explore All Content
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export { List };
