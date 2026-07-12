import { getAllMovies } from "@/services/api/moviesApi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SuggestedCard from "@/features/user-panel/components/SuggestedCard";
import {
  PanelShell,
  PanelHeader,
  PanelCard,
  panelInputClass,
} from "@/features/user-panel/components/PanelShell";
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

  if (error) {
    return (
      <PanelShell>
        <p className="text-red-400">Error loading data</p>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <PanelHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Your account activity, wallet, and personalized picks."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <PanelCard className="p-5 sm:p-6">
          <h2 className="mb-4 border-b border-gray-700/60 pb-3 text-lg font-semibold text-white">
            Account Information
          </h2>
          <div className="space-y-3">
            {[
              ["Total Purchase", "$2,000"],
              ["Last Purchase", "$550"],
              ["Basket Total", "$300"],
              ["Items in Basket", "3"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3"
              >
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-lg font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-gray-700/60 pb-3">
            <span className="text-sm text-gray-400">Wallet Balance</span>
            <span className="text-2xl font-bold text-white">$1,950</span>
          </div>

          <h2 className="mb-4 text-lg font-semibold text-white">Your Activity</h2>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="h-32 w-32">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  path: { stroke: "#e11d48" },
                  text: { fill: "#e11d48", fontSize: "16px" },
                  trail: { stroke: "#374151" },
                }}
              />
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3">
              {[
                { icon: FiClock, color: "text-red-400", label: "Watch Time", value: "12H" },
                { icon: FiThumbsUp, color: "text-emerald-400", label: "Likes", value: "5" },
                { icon: FiThumbsDown, color: "text-rose-400", label: "Dislikes", value: "3" },
                { icon: FiMessageCircle, color: "text-amber-400", label: "Comments", value: "15" },
              ].map(({ icon: Icon, color, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2.5"
                >
                  <Icon className={color} />
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PanelCard>
      </div>

      <PanelCard className="p-5 sm:p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-white">Suggested for You</h2>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search suggestions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${panelInputClass} pl-10`}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-500/30 border-t-red-500" />
          </div>
        )}

        {!loading && (
          <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 sm:gap-5">
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <SuggestedCard key={item?.id} item={item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FiShoppingCart className="mb-3 text-4xl text-gray-600" />
                <p className="text-lg text-gray-400">No suggestions found</p>
                <p className="text-sm text-gray-500">Try adjusting your search</p>
              </div>
            )}
          </div>
        )}
      </PanelCard>
    </PanelShell>
  );
};

export default Dashboard;
