import React, { useEffect, useState } from "react";
import { getAllMovies } from "@/services/api/moviesApi";
import { Box2 } from "@/shared/ui/MediaCardGrid";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Newset = ({ title = "Latest Releases" }) => {
  const [New, setNew] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const results = await getAllMovies();
      // Sort by id descending for newest first
      const sortedData = results.sort(
        (a, b) => parseInt(b.id) - parseInt(a.id),
      );
      setNew(sortedData.slice(0, 8));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-red-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-64 h-96 bg-gray-700/30 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">


      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-5">
        {New.map((item) => (
          <Box2 key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Newset;
