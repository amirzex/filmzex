import { useState } from "react";
import {
  FiClock,
  FiThumbsUp,
  FiThumbsDown,
  FiStar,
  FiCornerDownRight,
  FiEye,
  FiEyeOff,
  FiMessageCircle,
} from "react-icons/fi";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Avatar = ({ src, name, size = 40 }) => {
  const [failed, setFailed] = useState(false);
  const initial = (name || "?").charAt(0).toUpperCase();

  if (!src || failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-red-500/20 text-red-400 font-bold shrink-0"
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className="rounded-full object-cover shrink-0"
    />
  );
};

const Reactions = ({ likes = 0, dislikes = 0, small }) => {
  const [state, setState] = useState({ likes, dislikes, reaction: null });
  const size = small ? 12 : 15;

  const react = (type) =>
    setState((s) => {
      if (s.reaction === type) {
        return { ...s, [`${type}s`]: s[`${type}s`] - 1, reaction: null };
      }
      const next = { ...s, reaction: type, [`${type}s`]: s[`${type}s`] + 1 };
      const other = type === "like" ? "dislike" : "like";
      if (s.reaction === other) next[`${other}s`] = s[`${other}s`] - 1;
      return next;
    });

  const color = (type) =>
    state.reaction === type ? "text-red-400" : "text-gray-400 hover:text-red-400";

  return (
    <>
      <button
        type="button"
        onClick={() => react("like")}
        className={`flex items-center gap-1.5 transition-colors ${color("like")}`}
      >
        <FiThumbsUp size={size} /> {state.likes}
      </button>
      <button
        type="button"
        onClick={() => react("dislike")}
        className={`flex items-center gap-1.5 transition-colors ${color("dislike")}`}
      >
        <FiThumbsDown size={size} /> {state.dislikes}
      </button>
    </>
  );
};

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const submit = () => {
    if (username.trim().length < 2 || content.trim().length < 2) return;
    onSubmit({ username: username.trim(), content: content.trim() });
    setUsername("");
    setContent("");
  };

  const inputClass =
    "w-full bg-gray-900/60 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all";

  return (
    <div className="flex flex-col gap-2 mt-2 pl-4 border-l-2 border-red-400/40">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your name"
        className={inputClass}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="2"
        placeholder="Write a reply..."
        className={`${inputClass} resize-none`}
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          className="px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transition-all"
        >
          Reply
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 text-sm rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/40 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Reply = ({ reply }) => (
  <div className="flex gap-3 mt-3 pl-4 border-l-2 border-gray-700">
    <Avatar src={reply.userAvatar} name={reply.username} size={32} />
    <div className="flex flex-col gap-1 flex-1">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-200 text-sm">{reply.username}</span>
        {reply.isEdited && <span className="text-gray-500 text-xs">(edited)</span>}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{reply.content}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <Reactions likes={reply.likes} dislikes={reply.dislikes} small />
        <span className="flex items-center gap-1">
          <FiClock size={12} /> {formatDate(reply.timestamp)}
        </span>
      </div>
    </div>
  </div>
);

const Comment = ({ comment, onReply }) => {
  const [revealed, setRevealed] = useState(false);
  const [replying, setReplying] = useState(false);
  const showSpoiler = comment.isSpoiler && !revealed;
  const replies = Array.isArray(comment.replies) ? comment.replies : [];

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-red-400/30 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar src={comment.userAvatar} name={comment.username} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{comment.username}</span>
              {comment.isEdited && <span className="text-gray-500 text-xs">(edited)</span>}
            </div>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FiClock size={12} /> {formatDate(comment.timestamp)}
            </span>
          </div>
        </div>

        {comment.rating ? (
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-lg text-sm font-medium">
            <FiStar size={14} className="fill-yellow-400" />
            {comment.rating}
          </div>
        ) : null}
      </div>

      {showSpoiler ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900/60 rounded-lg text-gray-400 hover:text-red-400 border border-dashed border-gray-600 transition-all"
        >
          <FiEye /> Spoiler — click to reveal
        </button>
      ) : (
        <div>
          <p className="text-gray-100 leading-relaxed pl-2 border-l-2 border-red-400/50">
            {comment.content}
          </p>
          {comment.isSpoiler && (
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="mt-1 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
            >
              <FiEyeOff size={12} /> Hide spoiler
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm">
        <Reactions likes={comment.likes} dislikes={comment.dislikes} />
        <button
          type="button"
          onClick={() => setReplying((v) => !v)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors"
        >
          <FiMessageCircle size={15} /> Reply
        </button>
      </div>

      {replying && (
        <ReplyForm
          onSubmit={(values) => {
            onReply?.(comment.id, values);
            setReplying(false);
          }}
          onCancel={() => setReplying(false)}
        />
      )}

      {replies.length > 0 && (
        <div className="mt-1">
          <span className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <FiCornerDownRight size={12} /> {replies.length}{" "}
            {replies.length === 1 ? "reply" : "replies"}
          </span>
          {replies.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const Commentresults = ({ comments = [], onReply }) => (
  <div className="flex flex-col gap-4 w-full">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))
    ) : (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-800/30 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-lg">No comments yet.</p>
        <p className="text-gray-500 text-sm mt-2">Be the first to comment!</p>
      </div>
    )}
  </div>
);

export { Commentresults };
