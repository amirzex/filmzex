import { useEffect, useState } from "react";
import { getAllCourses } from "@/services/api/moviesApi";
import { BLOG } from "@/shared/ui/BlogCard";
import { useParams, Link } from "react-router-dom";
import { FaNewspaper, FaArrowRight } from "react-icons/fa";

const Latest = ({ title = "Latest Articles" }) => {
  const { id } = useParams();
  const [Blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const results = await getAllCourses();
      const resultsData = { data: results };
      // Sort by id descending for newest first
      const sortedData = resultsData.data.sort(
        (a, b) => parseInt(b.id) - parseInt(a.id),
      );
      setBlog(sortedData.slice(0, 6));
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
          <div className="h-8 w-1 bg-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-700/30 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
 

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Blog.map((item) => (
          <BLOG key={item.id} item={item} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Latest;
