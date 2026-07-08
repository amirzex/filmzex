import React, { useState } from "react";
import { motion } from "framer-motion";
import star from "../../assets/landing/icons8-rating-50.png";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiHeart,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";
import backup from "../../assets/landing/backup.jpg";

export const Newblog = ({ item, index = 0 }) => {
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
        text: item.description || item.blog || "Check out this article",
        url: window.location.href + "/Blog2th/" + item.id,
      });
    }
  };

  const handleClick = () => {
    navigate("/Blog2th/" + item.id);
  };

  // Get category from item
  const category = Array.isArray(item.category || item.genre)
    ? (item.category || item.genre).join(", ")
    : (item.category || item.genre || "Article");

  // Get year from item
  const year =
    item.year || item.release_year || item.releaseDate?.split("-")[0] || "";

  // Get read time (estimate based on content length)
  const getReadTime = () => {
    if (item.readTime) return item.readTime;
    if (item.blog) {
      const words = item.blog.split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      return `${minutes} min read`;
    }
    return "3 min read";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleClick}
      className="relative w-80 max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gray-800/40 backdrop-blur-md border border-gray-700/50 hover:border-red-400/40 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-red-500/20"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-800">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={!imageError ? (item.poster || item.poster_url) : backup}
          onError={(e) => {
            setImageError(true);
            e.target.src = backup;
          }}
          alt={item.title || "Blog Post"}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            {category}
          </span>
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
            {isBookmarked ? (
              <FaBookmark className="w-4 h-4" />
            ) : (
              <FiBookmark className="w-4 h-4" />
            )}
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full bg-black/50 text-white/70 hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300"
          >
            <FiShare2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Read Time Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10 z-10">
          <FiClock className="w-3 h-3 text-gray-400" />
          <span>{getReadTime()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-2">
          {item.title || "Untitled"}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-3">
          {item.description || item.blog || "No description available"}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex justify-between items-center text-sm border-t border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {(item.director || item.author || "U").charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-400 text-xs">
            By{" "}
            <span className="text-red-400 font-medium hover:text-red-300 transition-colors">
              {item.director || item.author || "Unknown"}
            </span>
          </span>
        </div>

        <div className="flex flex-row gap-1.5 justify-center items-center bg-gray-700/30 px-2.5 py-1 rounded-full">
          <span className="text-white font-semibold text-xs">
            {item.rating || "0.0"}
          </span>
          <img className="w-4 h-4" src={star} alt="Rating" />
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};
