import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import star from "@/assets/landing/icons8-rating-50.png";
import backup from "@/assets/landing/backup.jpg";
import { FiStar, FiHeart, FiClock } from "react-icons/fi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useState } from "react";

const Box2 = ({ item }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleClick = () => {
    navigate("/movies/" + item.id);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      className="relative max-sm:w-full flex flex-col gap-2 sm:gap-3 w-[47%] sm:w-56 md:w-64 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-gray-800/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/20 border border-transparent hover:border-red-400/30 transition-all duration-300 p-2 sm:p-4"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl w-full aspect-[2/3]">
        {/* Subscription Badge */}
        {item.sub && (
          <div className="absolute z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 w-40 flex flex-row justify-center font-bold -rotate-[35deg] -right-10 top-5 shadow-lg shadow-red-500/30">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider">{item.sub}</span>
          </div>
        )}

        {/* Image */}
        <img
          src={!imageError ? (item.poster || item.poster_url) : backup}
          onError={(e) => {
            setImageError(true);
            e.target.src = backup;
          }}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          alt={item.title || "Film Poster"}
          loading="lazy"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-2xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg shadow-red-600/30">
            <FaPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-1" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/70 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 border border-yellow-500/30">
          <FiStar className="text-yellow-400 text-xs sm:text-sm" />
          <span className="text-white font-bold text-xs sm:text-sm">
            {item.rating || "N/A"}
          </span>
          <span className="hidden sm:inline text-gray-400 text-xs">/10</span>
        </div>

        {/* Year Badge */}
        {(item.release_year || item.year) && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1">
            <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {item.release_year || item.year}
          </div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked
              ? "bg-red-500/80 text-white"
              : "bg-black/50 text-white/70 hover:bg-red-500/50"
          }`}
        >
          {isLiked ? (
            <FaHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </motion.button>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 text-center">
        {item.title || "Untitled"}
      </h3>

      {/* Category */}
      {item.category && (
        <p className="text-xs sm:text-sm text-gray-400 -mt-1 text-center line-clamp-1">
          {item.category}
        </p>
      )}

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
    </motion.div>
  );
};

export { Box2 };
