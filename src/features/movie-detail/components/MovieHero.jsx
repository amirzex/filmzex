import { motion } from "framer-motion";
import { FiUser, FiFilm } from "react-icons/fi";
import { itemVariants } from "@/features/movie-detail/animations";
import flag from "@/assets/detail/icons8-country-48.png";
import star from "@/assets/detail/icons8-rate-40.png";
import calender from "@/assets/detail/icons8-calender-64.png";
import duration from "@/assets/detail/icons8-time-50.png";

const InfoTag = ({ icon, alt, children }) => (
  <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-lg">
    <img src={icon} className="w-5 h-5" alt={alt} />
    <span className="text-white text-sm">{children}</span>
  </div>
);

const Trailer = ({ data }) => {
  if (data.trailer) {
    return (
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
        <iframe
          width="100%"
          height="100%"
          src={data.trailer.replace("watch?v=", "embed/")}
          title={data.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }
  if (data.trailer_url) {
    return (
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
        <video controls className="w-full h-full object-cover">
          <source src={data.trailer_url} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center aspect-video bg-gray-800/60 rounded-xl">
      <FiFilm className="w-16 h-16 text-gray-600" />
      <p className="text-gray-400 mt-2">No trailer available</p>
    </div>
  );
};

const MovieHero = ({ data }) => {
  const genre = Array.isArray(data.genre)
    ? data.genre.join(", ")
    : data.genre || "Movie";
  const cast = Array.isArray(data.cast) ? data.cast.join(", ") : data.cast;
  const year =
    data.year || data.release_year || data.releaseDate?.split("-")[0];

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex flex-col lg:flex-row gap-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden p-6">
        <div className="lg:w-3/5">
          <Trailer data={data} />
        </div>

        <div className="lg:w-2/5 flex flex-col gap-4">
          <span className="w-fit text-red-400 font-semibold text-sm bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {genre}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {data.title || "Untitled"}
          </h1>

          <p className="text-gray-300 text-sm leading-relaxed">
            {data.description || "No description available"}
          </p>

          {data.director && (
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="text-gray-400" />
              <span className="text-gray-400">Director:</span>
              <span className="text-red-400 font-medium">{data.director}</span>
            </div>
          )}

          {cast && (
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="text-gray-400" />
              <span className="text-gray-400">Cast:</span>
              <span className="text-gray-300">{cast}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-2">
            {data.country && (
              <InfoTag icon={flag} alt="Country">
                {data.country}
              </InfoTag>
            )}
            {data.rating && (
              <InfoTag icon={star} alt="Rating">
                {data.rating}
              </InfoTag>
            )}
            {year && (
              <InfoTag icon={calender} alt="Year">
                {year}
              </InfoTag>
            )}
            {(data.duration || data.duration_minutes) && (
              <InfoTag icon={duration} alt="Duration">
                {data.duration || `${data.duration_minutes} min`}
              </InfoTag>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { MovieHero };
