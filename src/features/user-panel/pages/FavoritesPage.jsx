import { useState } from "react";
import { FiHeart, FiTrash2, FiEye, FiStar } from "react-icons/fi";

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([
    {
      id: 1,
      title: "Inception",
      year: 2010,
      director: "Christopher Nolan",
      rating: 8.8,
      genre: "Sci-Fi",
      poster: "🎬",
      watched: true
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      rating: 9.3,
      genre: "Drama",
      poster: "🎬",
      watched: false
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      rating: 9.0,
      genre: "Action",
      poster: "🎬",
      watched: true
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      rating: 8.9,
      genre: "Crime",
      poster: "🎬",
      watched: false
    },
    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      director: "Robert Zemeckis",
      rating: 8.8,
      genre: "Drama",
      poster: "🎬",
      watched: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");

  //  genres filter
  const genres = ["All", ...new Set(favoriteMovies.map(movie => movie.genre))];

  // Filter movies based on search and genre
  const filteredMovies = favoriteMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.director.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "All" || movie.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleRemoveFromFavorites = (id) => {
    setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id));
  };

  const handleToggleWatched = (id) => {
    setFavoriteMovies(favoriteMovies.map(movie =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  };

  return (
    <div className="w-full p-5 bg-gray-800/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Favorite Movies</h1>
        <div className="flex items-center gap-2 text-red-500">
          <FiHeart className="text-2xl" />
          <span className="text-xl">{favoriteMovies.length} Movies</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or director..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Genre Filter */}
          <div className="md:w-48">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-gray-800">
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div className="bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Poster</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Director</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Genre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-700">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-700/30 transition-all duration-300">
                    {/* Poster */}
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                        {movie.poster}
                      </div>
                    </td>
                    
                    {/* Title */}
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{movie.title}</span>
                    </td>
                    
                    {/* Year */}
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{movie.year}</span>
                    </td>
                    
                    {/* Director */}
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{movie.director}</span>
                    </td>
                    
                    {/* Genre */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                        {movie.genre}
                      </span>
                    </td>
                    
                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-500" />
                        <span className="text-white">{movie.rating}</span>
                      </div>
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        movie.watched 
                          ? "bg-green-600/30 text-green-300" 
                          : "bg-yellow-600/30 text-yellow-300"
                      }`}>
                        {movie.watched ? "Watched" : "Want to Watch"}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleWatched(movie.id)}
                          className="text-gray-400 hover:text-blue-500 transition-all"
                          title={movie.watched ? "Mark as unwatched" : "Mark as watched"}
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleRemoveFromFavorites(movie.id)}
                          className="text-gray-400 hover:text-red-500 transition-all"
                          title="Remove from favorites"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FiHeart className="text-4xl text-gray-600" />
                      <p className="text-gray-400 text-lg">No favorite movies found</p>
                      <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Movies</p>
              <p className="text-2xl font-bold text-white">{favoriteMovies.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center">
              <FiHeart className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Watched</p>
              <p className="text-2xl font-bold text-white">
                {favoriteMovies.filter(m => m.watched).length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-600/30 rounded-lg flex items-center justify-center">
              <FiEye className="text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Want to Watch</p>
              <p className="text-2xl font-bold text-white">
                {favoriteMovies.filter(m => !m.watched).length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-600/30 rounded-lg flex items-center justify-center">
              <FiStar className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;