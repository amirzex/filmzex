import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMovie } from "./useMovie";
import { containerVariants } from "./parts/animations";
import { MovieHero } from "./parts/MovieHero";
import { FeedbackBar } from "./parts/FeedbackBar";
import { CommentSection } from "./parts/CommentSection";
import { DownloadOptions } from "./parts/DownloadOptions";

const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
    <p className="text-gray-400 text-sm animate-pulse">Loading content...</p>
  </div>
);

const Infopage = () => {
  const { id } = useParams();
  const { data, comments, loading, posting, error, addComment, addReply } =
    useMovie(id);

  if (error) {
    return <div className="text-white text-center p-10">Error: {error}</div>;
  }

  if (!data) return <Loader />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent px-4 md:px-8 lg:px-12 py-8"
    >
      <div className="max-w-7xl mx-auto">
        <MovieHero data={data} />
        <FeedbackBar data={data} />
        <CommentSection
          comments={comments}
          loading={loading}
          posting={posting}
          onAddComment={addComment}
          onReply={addReply}
        />
        <DownloadOptions data={data} />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 0, 0, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export { Infopage };
