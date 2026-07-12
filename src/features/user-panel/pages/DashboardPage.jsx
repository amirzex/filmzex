import { getAllMovies } from "@/services/api/moviesApi";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SuggestedCard from "@/features/user-panel/components/SuggestedCard";
import {
  FiShoppingCart,
  FiClock,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageCircle,
  FiSearch,
} from "react-icons/fi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const percentage = 66;
  const [Blog, setBlog] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const results = await getAllMovies();
      setBlog(results.slice(0, 5));
      console.log("Fetched blog data:", results);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = Blog?.filter((items) =>
    (items?.title ?? "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <div className="text-white p-5">Error loading data</div>;

  return (
    <div className="w-full p-5 bg-gray-800/40 backdrop-blur-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <a
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          href="/"
        >
          Buy Subscription
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Account Information Card */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Total Purchase</span>
              <span className="text-white font-bold text-lg">$2,000</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Last Purchase</span>
              <span className="text-white font-bold text-lg">$550</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Basket Total</span>
              <span className="text-white font-bold text-lg">$300</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Items in Basket</span>
              <span className="text-white font-bold text-lg">3</span>
            </div>
          </div>
        </div>

        {/* Wallet & Activity Card */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
          {/* Wallet */}
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              {/* <FiWallet className="text-green-400 text-xl" /> */}
              <span className="text-gray-300">Wallet Balance</span>
            </div>
            <span className="text-white font-bold text-2xl">$1,950</span>
          </div>

          {/* Activity */}
          <h2 className="text-xl font-semibold text-white mb-4">
            Your Activity
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Progress Circle */}
            <div className="w-32 h-32">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  path: { stroke: "#FF6B6B" },
                  text: { fill: "#FF6B6B", fontSize: "16px" },
                  trail: { stroke: "#374151" },
                }}
              />
            </div>

            {/* Activity Stats */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg">
                <FiClock className="text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Watch Time</p>
                  <p className="text-white font-semibold">12H</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg">
                <FiThumbsUp className="text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">Likes</p>
                  <p className="text-white font-semibold">5</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg">
                <FiThumbsDown className="text-red-400" />
                <div>
                  <p className="text-xs text-gray-400">Dislikes</p>
                  <p className="text-white font-semibold">3</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg">
                <FiMessageCircle className="text-yellow-400" />
                <div>
                  <p className="text-xs text-gray-400">Comments</p>
                  <p className="text-white font-semibold">15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white">
            Suggested for You
          </h2>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search suggestions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Suggested Items Grid */}
        {!loading && (
          <div className="flex flex-row flex-wrap justify-center items-stretch gap-4 sm:gap-5 ">
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <SuggestedCard key={item?.id} item={item} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center ">
                <FiShoppingCart className="text-4xl text-gray-600 mb-3" />
                <p className="text-gray-400 text-lg">No suggestions found</p>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
