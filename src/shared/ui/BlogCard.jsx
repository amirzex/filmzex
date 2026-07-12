import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backup from "@/assets/landing/backup.jpg";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiBookOpen,
  FiEye,
  FiHeart,
} from "react-icons/fi";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { useState } from "react";

const BLOG = ({ item, featured = false, index = 0 }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.blog || "Check out this article",
        url: window.location.href + "/blog/" + item.id,
      });
    }
  };

  const handleClick = () => {
    navigate("/blog/" + item.id);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get category from item
  const category = Array.isArray(item.category || item.genre)
    ? (item.category || item.genre).join(", ")
    : (item.category || item.genre || "Article");

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleClick}
      className="relative flex flex-col rounded-2xl overflow-hidden shadow-lg h-auto bg-gray-800/40 backdrop-blur-md border border-gray-700/50 hover:border-red-400/40 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-red-500/10"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 bg-gray-800">
        <img
          src={!imageError ? (item?.poster || item?.poster_url) : backup}
          onError={(e) => {
            setImageError(true);
            e.target.src = backup;
          }}
          alt={item.title || "Blog Post"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-purple-500 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/20 z-10">
            <FiBookOpen className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">Featured</span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 z-10">
            <FiBookOpen className="w-3 h-3" />
            <span>{category}</span>
          </div>
        )}

        {/* Action Buttons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLiked
                ? "bg-red-500/80 text-white"
                : "bg-black/50 text-white/70 hover:bg-red-500/50"
            }`}
          >
            {isLiked ? (
              <FaHeart className="w-4 h-4" />
            ) : (
              <FiHeart className="w-4 h-4" />
            )}
          </motion.button>

          {/* Bookmark Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isBookmarked
                ? "bg-yellow-500/80 text-white"
                : "bg-black/50 text-white/70 hover:bg-yellow-500/50"
            }`}
          >
            <FaBookmark className="w-4 h-4" />
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full bg-black/50 text-white/70 hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300"
          >
            <FaShare className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Read Time Badge */}
        {item.readTime && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10 z-10">
            <FiClock className="w-3 h-3 text-gray-400" />
            <span>{item.readTime} min read</span>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent px-4 py-4 transition-all duration-300 group-hover:py-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">
          {item.title || "Untitled"}
        </h3>

        {/* Author Info */}
        <div className="flex items-center gap-2 mt-1">
          {item.author && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <FiUser className="w-3 h-3" />
              <span>{item.author}</span>
            </div>
          )}
          {item.author && item.date && (
            <span className="text-gray-600 text-xs">•</span>
          )}
          {item.date && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <FiCalendar className="w-3 h-3" />
              <span>{formatDate(item.date)}</span>
            </div>
          )}
        </div>

        {/* Blog Content - Shows on Hover */}
        {item.blog && (
          <div className="text-sm text-gray-300 mt-2 line-clamp-2 group-hover:line-clamp-none opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            <p className="leading-relaxed">{item.blog.substring(0, 150)}...</p>

            {/* Read More Indicator */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="inline-block mt-2 text-red-400 text-xs font-semibold hover:text-red-300 transition-colors"
            >
              Read more →
            </motion.span>
          </div>
        )}

        {/* Views Count (if available) */}
        {item.views && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiEye className="w-3 h-3" />
            <span>{item.views} views</span>
          </div>
        )}
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export { BLOG };
