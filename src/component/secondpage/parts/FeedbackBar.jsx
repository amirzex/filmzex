import { useState } from "react";
import { motion } from "framer-motion";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { itemVariants } from "./animations";
import exclamation from "../../../assets/second page/icons8-general-mandatory-action-50.png";

const FeedbackBar = ({ data }) => {
  const [reaction, setReaction] = useState(null);
  const isLiked = reaction === "like";
  const isDisliked = reaction === "dislike";

  const toggle = (value) =>
    setReaction((prev) => (prev === value ? null : value));

  const base =
    "flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 border";
  const active = "bg-red-500/20 border-red-500 text-red-400";
  const idle =
    "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-400";

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle("like")}
            className={`${base} ${isLiked ? active : idle}`}
          >
            {isLiked ? <FaHeart className="text-red-400" /> : <FiThumbsUp />}
            <span>Like</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle("dislike")}
            className={`${base} ${isDisliked ? active : idle}`}
          >
            <FiThumbsDown />
            <span>Dislike</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 px-6 py-2.5 rounded-xl border border-red-500/20">
          <img src={exclamation} alt="Alert" className="w-7 h-7" />
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-xl font-bold">
              {data.like || 0}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">
              {(data.like || 0) + (data.dislike || 0)}
            </span>
          </div>
          <span className="text-gray-400 text-sm">of users like this</span>
        </div>
      </div>
    </motion.div>
  );
};

export { FeedbackBar };
