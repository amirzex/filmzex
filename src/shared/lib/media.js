/**
 * Shared helpers for normalizing movie / media API fields.
 */

export const getPoster = (item, fallback = "") =>
  item?.poster || item?.poster_url || item?.image || fallback;

export const getTitle = (item) =>
  item?.title || item?.name || item?.movieName || "Untitled";

export const getGenreLabel = (item) => {
  const genre = item?.genre || item?.genres || item?.category;
  if (Array.isArray(genre)) return genre.filter(Boolean).join(", ");
  return genre || "Unknown";
};

export const getYear = (item) =>
  item?.year ||
  item?.release_year ||
  item?.releaseYear ||
  item?.releaseDate ||
  item?.released ||
  "—";

export const getRating = (item) =>
  item?.rating || item?.imdb || item?.score || item?.rate || "N/A";

export const getDescription = (item) =>
  item?.description || item?.overview || item?.plot || item?.summary || "";
