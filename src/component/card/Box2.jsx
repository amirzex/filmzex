import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import star from "../../assets/landing/icons8-rating-50.png";
import backup from "../../../src/assets/landing/backup.jpg";
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
    navigate("/team/" + item.id);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      className="relative flex flex-col gap-3 w-64 rounded-2xl overflow-hidden cursor-pointer group bg-gray-800/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/20 border border-transparent hover:border-red-400/30 transition-all duration-300 p-4"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl w-full aspect-[2/3]">
        {/* Subscription Badge */}
        {item.sub && (
          <div className="absolute z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 w-40 flex flex-row justify-center font-bold -rotate-[35deg] -right-10 top-5 shadow-lg shadow-red-500/30">
            <span className="text-xs uppercase tracking-wider">{item.sub}</span>
          </div>
        )}

        {/* Image */}
        <img
          src={!imageError ? item.poster_url : backup}
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
          <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg shadow-red-600/30">
            <FaPlay className="w-5 h-5 text-white ml-1" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-yellow-500/30">
          <FiStar className="text-yellow-400 text-sm" />
          <span className="text-white font-bold text-sm">
            {item.rating || "N/A"}
          </span>
          <span className="text-gray-400 text-xs">/10</span>
        </div>

        {/* Year Badge */}
        {(item.release_year || item.year) && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            {item.release_year || item.year}
          </div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
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
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 text-center">
        {item.title || "Untitled"}
      </h3>

      {/* Category */}
      {item.category && (
        <p className="text-sm text-gray-400 -mt-1 text-center">
          {item.category}
        </p>
      )}

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl" />
    </motion.div>
  );
};

export { Box2 };
