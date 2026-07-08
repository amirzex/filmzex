import { useEffect, useState, useRef } from "react";
import { getAllCourses } from "../core/api/courseApi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaFilm,
  FaTv,
  FaUser,
  FaStar,
  FaClock,
  FaYCombinator,
} from "react-icons/fa";
import { FiCommand } from "react-icons/fi";
import backup from "../../assets/landing/backup.jpg";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const results = await getAllCourses();
      setItems(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.genre)
        ? item.genre.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        : item.genre?.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleSearch = (term) => {
    // Save to recent searches
    if (term.trim() && !recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem("recentSearches", JSON.stringify(newRecent));
    }
  };

  const handleItemClick = (item) => {
    handleSearch(item.title || item.name);
    navigate("/team/" + item.id);
    setIsOpen(false);
    setSearchTerm("");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {/* Search Button with Keyboard Shortcut */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5"
        aria-label="Open Search"
      >
        <FaSearch className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <span className="hidden md:inline text-sm text-gray-400 group-hover:text-white transition-colors">
          Search
        </span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded border border-white/10">
          <FiCommand className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 px-4"
            onClick={() => {
              setIsOpen(false);
              setSearchTerm("");
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-3xl bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Area */}
              <div className="relative border-b border-gray-700/50">
                <div className="flex items-center gap-3 px-4 py-3">
                  <FaSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for movies, TV shows, genres..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedIndex(-1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && filteredItems.length > 0) {
                        const item =
                          filteredItems[selectedIndex >= 0 ? selectedIndex : 0];
                        if (item) handleItemClick(item);
                      }
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSelectedIndex((prev) =>
                          prev < filteredItems.length - 1 ? prev + 1 : prev,
                        );
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                      }
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hidden sm:block px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    ESC
                  </button>
                </div>
              </div>

              {/* Results Area */}
              <div className="max-h-[60vh] overflow-y-auto">
                {searchTerm.trim() ? (
                  // Search Results
                  <div className="p-2">
                    {filteredItems.length > 0 ? (
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {filteredItems.length} results found
                        </div>
                        {filteredItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            variants={resultVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleItemClick(item)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                              selectedIndex === index
                                ? "bg-red-600/20 border border-red-500/50"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <img
                              src={item.poster || item.poster_url}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = backup;
                              }}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              alt={item.title || item.name}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">
                                {item.title || item.name || "Untitled"}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                {item.genre && (
                                  <span className="flex items-center gap-1">
                                    <FaFilm className="w-3 h-3" />
                                    {Array.isArray(item.genre) ? item.genre.join(", ") : item.genre}
                                  </span>
                                )}
                                {item.rating && (
                                  <span className="flex items-center gap-1 text-yellow-400">
                                    <FaStar className="w-3 h-3" />
                                    {item.rating}
                                  </span>
                                )}
                                {item.year && (
                                  <span className="flex items-center gap-1">
                                    <FaClock className="w-3 h-3" />
                                    {item.year}
                                  </span>
                                )}
                              </div>
                            </div>
                            <FaSearch className="w-4 h-4 text-gray-500" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                          <FaSearch className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm">
                          Try searching with different keywords
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Recent Searches & Suggestions
                  <div className="p-4">
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <FaClock className="w-3 h-3" />
                            Recent Searches
                          </span>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchTerm(term)}
                              className="px-3 py-1.5 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Categories */}
                    <div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                        <FaYCombinator className="w-3 h-3" />
                        Popular Categories
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Action",
                          "Comedy",
                          "Drama",
                          "Sci-Fi",
                          "Horror",
                          "Romance",
                          "Thriller",
                          "Documentary",
                        ].map((genre) => (
                          <button
                            key={genre}
                            onClick={() => setSearchTerm(genre)}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-red-600/20 rounded-full transition-all border border-white/5 hover:border-red-500/30"
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Keyboard Shortcuts Help */}
                    <div className="mt-6 pt-4 border-t border-gray-700/30">
                      <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                            ↑↓
                          </kbd>
                          Navigate
                        </span>
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                            Enter
                          </kbd>
                          Select
                        </span>
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                            ESC
                          </kbd>
                          Close
                        </span>
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                            ⌘K
                          </kbd>
                          Open
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;
