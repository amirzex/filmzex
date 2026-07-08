import { deleteCourse } from "../core/api/courseApi";
import { FiTrash2, FiUser, FiClock } from "react-icons/fi";

const Commentresults = ({ comments, setComments }) => {
  const deleteComment = async (id) => {
    try {
      await deleteCourse(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="comment flex flex-col gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-red-400/30 transition-all duration-300"
          >
            <div className="flex flex-col gap-3">
              {/* User Info */}
              <div className="flex items-center gap-2 text-gray-300 border-b border-gray-700 pb-2">
                <FiUser className="text-red-400" />
                <span className="font-semibold">{comment.username}</span>
              </div>

              {/* Movie Topic */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Movie:</span>
                <b className="text-red-400 text-lg">{comment.topic}</b>
              </div>

              {/* Comment Text */}
              <p className="text-white text-lg leading-relaxed pl-2 border-l-2 border-red-400/50">
                {comment.comment}
              </p>

              {/* Timestamp */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <FiClock size={14} />
                <span>{comment.timestamp}</span>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteComment(comment.id)}
              className="self-end flex items-center gap-2 px-4 py-2 border border-red-400/50 rounded-lg text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 group"
            >
              <FiTrash2 className="group-hover:scale-110 transition-transform" />
              <span>Delete</span>
            </button>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800/30 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-lg">No comments yet.</p>
          <p className="text-gray-500 text-sm mt-2">Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export { Commentresults };
