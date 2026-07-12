import { FiHeart } from "react-icons/fi";

const SuggestedCard = ({ item }) => {
  return (
    <div className="w-[46%] overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-800/40 transition-all duration-300 hover:scale-[1.03] hover:border-red-500/30 sm:w-40 md:w-[20%]">
      <div className="flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-red-900/40 to-gray-900">
        <img
          src={item?.poster || item?.poster_url}
          alt={item?.title || "Poster"}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-white">
          {item?.title || "Untitled"}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {Array.isArray(item?.genre)
              ? item.genre[0]
              : item?.category || item?.genre || "General"}
          </span>

          <button
            type="button"
            className="text-gray-400 transition-all hover:text-red-500"
          >
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;
