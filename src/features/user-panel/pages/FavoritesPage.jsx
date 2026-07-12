import { useState } from "react";
import { FiHeart, FiTrash2, FiEye, FiStar } from "react-icons/fi";
import {
  PanelShell,
  PanelHeader,
  PanelCard,
  panelInputClass,
} from "@/features/user-panel/components/PanelShell";

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
      watched: true,
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      rating: 9.3,
      genre: "Drama",
      poster: "🎬",
      watched: false,
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      rating: 9.0,
      genre: "Action",
      poster: "🎬",
      watched: true,
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      rating: 8.9,
      genre: "Crime",
      poster: "🎬",
      watched: false,
    },
    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      director: "Robert Zemeckis",
      rating: 8.8,
      genre: "Drama",
      poster: "🎬",
      watched: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");

  const genres = ["All", ...new Set(favoriteMovies.map((movie) => movie.genre))];

  const filteredMovies = favoriteMovies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "All" || movie.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleRemoveFromFavorites = (id) => {
    setFavoriteMovies(favoriteMovies.filter((movie) => movie.id !== id));
  };

  const handleToggleWatched = (id) => {
    setFavoriteMovies(
      favoriteMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie,
      ),
    );
  };

  return (
    <PanelShell>
      <PanelHeader
        eyebrow="Library"
        title="Favorite Movies"
        description="Titles you’ve saved — filter, mark watched, or remove."
        actions={
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400">
            <FiHeart className="text-lg" />
            <span className="text-sm font-semibold">
              {favoriteMovies.length} Movies
            </span>
          </div>
        }
      />

      <PanelCard className="mb-6 p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or director..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={panelInputClass}
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className={panelInputClass}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre} className="bg-gray-900">
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PanelCard>

      <PanelCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700/60 bg-gray-800/60">
                {[
                  "Poster",
                  "Title",
                  "Year",
                  "Director",
                  "Genre",
                  "Rating",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 font-medium text-gray-400 sm:px-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="border-b border-gray-800/80 transition hover:bg-white/[0.03] last:border-0"
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/80 to-rose-600 text-xl">
                        {movie.poster}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-white sm:px-6">
                      {movie.title}
                    </td>
                    <td className="px-4 py-4 text-gray-300 sm:px-6">
                      {movie.year}
                    </td>
                    <td className="px-4 py-4 text-gray-300 sm:px-6">
                      {movie.director}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                        {movie.genre}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-1 text-white">
                        <FiStar className="text-amber-400" />
                        {movie.rating}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          movie.watched
                            ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                            : "border border-amber-500/20 bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {movie.watched ? "Watched" : "Want to Watch"}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleWatched(movie.id)}
                          className="text-gray-400 transition hover:text-red-400"
                          title={
                            movie.watched
                              ? "Mark as unwatched"
                              : "Mark as watched"
                          }
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFromFavorites(movie.id)}
                          className="text-gray-400 transition hover:text-red-500"
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
                      <p className="text-lg text-gray-400">
                        No favorite movies found
                      </p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PanelCard>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            label: "Total Movies",
            value: favoriteMovies.length,
            icon: FiHeart,
            tone: "text-red-400 bg-red-500/15",
          },
          {
            label: "Watched",
            value: favoriteMovies.filter((m) => m.watched).length,
            icon: FiEye,
            tone: "text-emerald-400 bg-emerald-500/15",
          },
          {
            label: "Want to Watch",
            value: favoriteMovies.filter((m) => !m.watched).length,
            icon: FiStar,
            tone: "text-amber-400 bg-amber-500/15",
          },
        ].map(({ label, value, icon: Icon, tone }) => (
          <PanelCard key={label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon />
              </div>
            </div>
          </PanelCard>
        ))}
      </div>
    </PanelShell>
  );
};

export default Favorite;
