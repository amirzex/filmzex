import { useState, useEffect } from "react";
import { getMovieById } from "@/services/api/moviesApi";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import flagIcon from "@/assets/detail/icons8-country-48.png";
import starIcon from "@/assets/detail/icons8-rate-40.png";
import calendarIcon from "@/assets/detail/icons8-calender-64.png";
import timeIcon from "@/assets/detail/icons8-time-50.png";
import alertIcon from "@/assets/detail/icons8-general-mandatory-action-50.png";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiUser,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiShare2,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import backup from "@/assets/landing/backup.jpg";

const Blog2th = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        if (data) {
          setMovie(data);
        } else {
          setError("Movie data not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.blog || movie.description || "Check out this article",
        url: window.location.href,
      });
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-red-400 text-5xl">⚠️</div>
        <p className="text-red-400 text-xl">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
        <p className="text-gray-400 text-sm animate-pulse">
          Loading article...
        </p>
      </div>
    );
  }

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
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent px-4 md:px-8 lg:px-12 py-8"
    >
      <div className="max-w-5xl mx-auto">
     

        {/* Poster Image */}
        <motion.div
          variants={itemVariants}
          className="w-full mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800"
        >
          <img
            src={!imageError ? (movie.poster || movie.poster_url) : backup}
            onError={(e) => {
              setImageError(true);
              e.target.src = backup;
            }}
            alt={movie.title || "Blog Post"}
            className="w-full h-auto max-h-[500px] object-contain bg-gray-900"
            loading="lazy"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700 shadow-lg"
        >
          {/* Header Info */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm uppercase text-red-400 font-semibold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                {Array.isArray(movie.genre) ? movie.genre.join(", ") : (movie.genre || "Article")}
              </span>
              {movie.category && (
                <span className="text-sm uppercase text-purple-400 font-semibold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {movie.category}
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <FiShare2 />
              <span className="hidden sm:inline text-sm">Share</span>
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {movie.title || "Untitled"}
          </h1>

          {/* Blog Content */}
          {(movie.blog || movie.description) && (
            <div className="mb-6 p-4 bg-gray-700/20 rounded-xl border-l-4 border-red-400">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {movie.blog || movie.description}
              </p>
            </div>
          )}

          {/* Director */}
          {movie.director && (
            <div className="flex items-center gap-2 text-sm mb-4">
              <FiUser className="text-gray-400" />
              <span className="text-gray-400">Director:</span>
              <span className="text-red-400 font-medium">{movie.director}</span>
            </div>
          )}

          {movie.cast && movie.cast.length > 0 && (
            <div className="flex items-center gap-2 text-sm mb-4">
              <FiUser className="text-gray-400" />
              <span className="text-gray-400">Cast:</span>
              <span className="text-gray-300">
                {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
              </span>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {movie.country && (
              <div className="flex items-center gap-3 bg-gray-700/30 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-colors">
                <img src={flagIcon} alt="Country" className="w-6 h-6" />
                <span className="text-white text-sm">{movie.country}</span>
              </div>
            )}

            {movie.rating && (
              <div className="flex items-center gap-3 bg-gray-700/30 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-colors">
                <img src={starIcon} alt="Rating" className="w-6 h-6" />
                <span className="text-white text-sm">{movie.rating}</span>
              </div>
            )}

            {movie.releaseDate && (
              <div className="flex items-center gap-3 bg-gray-700/30 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-colors">
                <img
                  src={calendarIcon}
                  alt="Release Year"
                  className="w-6 h-6"
                />
                <span className="text-white text-sm">{movie.year || movie.release_year || movie.releaseDate?.split("-")[0]}</span>
              </div>
            )}

            {(movie.duration || movie.duration_minutes) && (
              <div className="flex items-center gap-3 bg-gray-700/30 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-colors">
                <img src={timeIcon} alt="Duration" className="w-6 h-6" />
                <span className="text-white text-sm">
                  {movie.duration || `${movie.duration_minutes} min`}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          variants={itemVariants}
          className="mt-6 bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-400"
                } border`}
              >
                {isLiked ? (
                  <FaHeart className="text-red-400" />
                ) : (
                  <FiThumbsUp />
                )}
                <span>Like</span>
                {movie.like > 0 && (
                  <span className="ml-1 text-xs bg-gray-700/50 px-2 py-0.5 rounded-full">
                    {movie.like}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDislike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                  isDisliked
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-400"
                } border`}
              >
                <FiThumbsDown />
                <span>Dislike</span>
                {movie.dislike > 0 && (
                  <span className="ml-1 text-xs bg-gray-700/50 px-2 py-0.5 rounded-full">
                    {movie.dislike}
                  </span>
                )}
              </motion.button>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 px-6 py-3 rounded-xl border border-red-500/20">
              <img src={alertIcon} alt="Feedback" className="w-7 h-7" />
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-2xl font-bold">
                  {movie.like || 0}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-white">
                  {movie.like + movie.dislike || 0}
                </span>
              </div>
              <span className="text-gray-400 text-sm hidden sm:inline">
                users liked this
              </span>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        {movie.description && movie.blog !== movie.description && (
          <motion.div
            variants={itemVariants}
            className="mt-6 bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiBookOpen className="text-red-400" />
              About
            </h2>
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </motion.div>
        )}

        {/* Tags */}
        {movie.tags && movie.tags.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-2"
          >
            {movie.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs bg-gray-700/30 text-gray-300 rounded-full border border-gray-600 hover:border-red-400/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Footer Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700/50 pt-4"
        >
          <span>Published: {movie.year || movie.release_year || movie.releaseDate?.split("-")[0] || "N/A"}</span>
          <span className="mx-2">•</span>
          <span>Genre: {Array.isArray(movie.genre) ? movie.genre.join(", ") : (movie.genre || "N/A")}</span>
          <span className="mx-2">•</span>
          <span>ID: #{movie.id}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { Blog2th as BlogDetailPage };
