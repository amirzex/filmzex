import { FiHeart } from "react-icons/fi";

const SuggestedCard = ({ item }) => {
  return (
    <div className="bg-gray-700/30 w-[20%] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      {/* Image/Placeholder */}
      <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
        <img src={item?.poster_url} className="w-full" />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
          {item?.title || "Untitled"}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {item?.category || "General"}
          </span>

          <button className="text-gray-400 hover:text-red-500 transition-all">
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;
