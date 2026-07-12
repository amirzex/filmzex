import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@/shared/ui/MediaCard";
import { FaFire, FaArrowRight } from "react-icons/fa";

const Suggested = ({ items2, title = "Suggested For You" }) => {
  if (!items2 || items2.length === 0) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <p className="text-gray-400">No suggestions available</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-red-500 rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            {items2.length}
          </span>
        </div>
        <Link
          to="/browse"
          className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          View All
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-5">
        {items2.slice(0, 8).map((item) => (
          <Box key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Suggested;
