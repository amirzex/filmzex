import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import star from "../../assets/landing/icons8-rating-50.png";
import backup from "../../assets/landing/backup.jpg";
import { FiHeart, FiClock, FiFilm, FiUser, FiStar } from "react-icons/fi";
import { FaHeart, FaPlay, FaFire } from "react-icons/fa";
import { useState } from "react";

const Box = ({ item, featured = false, index = 0 }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
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

  const handleClick = () => {
    navigate("/team/" + item.id);
  };

  // Get genre from item
  const genre = item.genre || item.category || "Movie";

  // Get year from item
  const year =
    item.year || item.release_year || item.releaseDate?.split("-")[0] || "";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleClick}
      className={`relative flex flex-col w-64 md:w-72 rounded-2xl overflow-hidden bg-gray-800/40 backdrop-blur-md border border-gray-700/50 hover:border-red-400/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-red-500/20`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[2/3] bg-gray-800">
        <img
          src={!imageError ? item.poster_url : backup}
          onError={(e) => {
            setImageError(true);
            e.target.src = backup;
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          alt={item.title || item.name || "Film Poster"}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay - shows on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-red-600/30 transform scale-75 group-hover:scale-100 transition-transform duration-300"
          >
            <FaPlay className="w-6 h-6 text-white ml-1" />
          </motion.div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-purple-500 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/20">
            <FaFire className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">Featured</span>
          </div>
        )}

        {/* Year Badge */}
        {year && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
            <div className="flex items-center gap-1.5">
              <FiClock className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-medium text-white/90">{year}</span>
            </div>
          </div>
        )}

        {/* Rating Badge - Top Right */}
        {item.rating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-1">
              <img src={star} className="w-4 h-4" alt="Rating" />
              <span className="text-xs font-bold text-yellow-400">
                {item.rating}
              </span>
            </div>
          </div>
        )}

        {/* Like Button - Top Right (overrides rating if both present) */}
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

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 gap-2">
        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
          {item.title || item.name || "Untitled"}
        </h3>

        {/* Genre Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            <FiFilm className="w-3 h-3" />
            <span className="font-medium">{genre}</span>
          </div>
          {item.director && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <FiUser className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{item.director}</span>
            </div>
          )}
        </div>

        {/* Rating & Info */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-700/30 px-2.5 py-1 rounded-full">
              <FiStar className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-semibold text-white">
                {item.rating || "N/A"}
              </span>
            </div>
          </div>

          {/* Duration (if available) */}
          {item.duration && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {item.duration}
            </span>
          )}
        </div>

        {/* Description - shows on hover */}
        {item.description && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            whileHover={{ opacity: 1, height: "auto" }}
            className="text-xs text-gray-300 line-clamp-2 mt-1 overflow-hidden"
          >
            {item.description}
          </motion.p>
        )}
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export { Box };
