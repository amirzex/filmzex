import { useState, useEffect } from "react";
import { getAllCourses, addCourse } from "../core/api/courseApi";
import { Form, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import flag from "../../assets/second page/icons8-country-48.png";
import star from "../../assets/second page/icons8-rate-40.png";
import calender from "../../assets/second page/icons8-calender-64.png";
import duration from "../../assets/second page/icons8-time-50.png";
import nodataGif from "../../assets/second page/no-data.gif";
import like from "../../assets/second page/icons8-like-48.png";
import dislike from "../../assets/second page/icons8-dislike-48.png";
import exclamation from "../../assets/second page/icons8-general-mandatory-action-50.png";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Commentresults } from "../Commentpage/Commentresults";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiDownload,
  FiEye,
  FiUser,
  FiMessageCircle,
  FiShare2,
  FiHeart,
  FiClock,
  FiCalendar,
  FiFilm,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Infopage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const fetchData = async () => {
    try {
      const responseData = await getAllCourses();
      if (responseData) {
        setData(
          Array.isArray(responseData) ? responseData[id - 1] : responseData,
        );
      } else {
        setError("Data not found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const responseData = await getAllCourses({ skip: 10 });
      setComments(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const Addcomment = async (values, { resetForm }) => {
    const newComment = { ...values, timestamp: new Date().toLocaleString() };

    try {
      const responseData = await addCourse(newComment);

      if (responseData) {
        setComments([...comments, responseData]);
        resetForm();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchComments();
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  if (error) {
    return <div className="text-white text-center p-10">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
        <p className="text-gray-400 text-sm animate-pulse">
          Loading content...
        </p>
      </div>
    );
  }

  const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    comment: Yup.string().required("Comment is required"),
    topic: Yup.string().required("Topic is required"),
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent px-4 md:px-8 lg:px-12 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div variants={itemVariants} className="mb-8">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden p-6">
            {/* Video Section */}
            <div className="lg:w-3/5">
              {data.trailer_url ? (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
                  <video
                    width="100%"
                    height="100%"
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src={data.trailer_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center aspect-video bg-gray-800/60 rounded-xl">
                  <FiFilm className="w-16 h-16 text-gray-600" />
                  <p className="text-gray-400 mt-2">No trailer available</p>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="lg:w-2/5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-semibold text-sm bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  {data.genre || "Movie"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {data.title || "Untitled"}
              </h1>

              <p className="text-gray-300 text-sm leading-relaxed">
                {data.description || "No description available"}
              </p>

              {data.director && (
                <div className="flex items-center gap-2 text-sm">
                  <FiUser className="text-gray-400" />
                  <span className="text-gray-400">Director:</span>
                  <span className="text-red-400 font-medium">
                    {data.director}
                  </span>
                </div>
              )}

              {/* Info Tags */}
              <div className="flex flex-wrap gap-3 mt-2">
                {data.country && (
                  <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-lg">
                    <img src={flag} className="w-5 h-5" alt="Country" />
                    <span className="text-white text-sm">{data.country}</span>
                  </div>
                )}

                {data.rating && (
                  <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-lg">
                    <img src={star} className="w-5 h-5" alt="Rating" />
                    <span className="text-white text-sm">{data.rating}</span>
                  </div>
                )}

                {data.release_year && (
                  <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-lg">
                    <img src={calender} className="w-5 h-5" alt="Year" />
                    <span className="text-white text-sm">
                      {data.release_year}
                    </span>
                  </div>
                )}

                {data.duration_minutes && (
                  <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-lg">
                    <img src={duration} className="w-5 h-5" alt="Duration" />
                    <span className="text-white text-sm">
                      {data.duration_minutes} min
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-400"
                } border`}
              >
                {isLiked ? (
                  <FaHeart className="text-red-400" />
                ) : (
                  <FiThumbsUp />
                )}
                <span>Like</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDislike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                  isDisliked
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-400"
                } border`}
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
                  {data.like + data.dislike || 0}
                </span>
              </div>
              <span className="text-gray-400 text-sm">of users like this</span>
            </div>
          </div>
        </motion.div>

        {/* Comment Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden">
            <Formik
              initialValues={{ username: "", comment: "", topic: "" }}
              validationSchema={validation}
              onSubmit={Addcomment}
            >
              {({ handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col lg:flex-row"
                >
                  {/* Comment Form */}
                  <div className="lg:w-2/5 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FiMessageCircle className="text-red-400" />
                      Leave a Comment
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <Field
                          type="text"
                          name="username"
                          placeholder="Username"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-all"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-400 text-xs mt-1 font-medium"
                        />
                      </div>

                      <div>
                        <Field
                          type="text"
                          name="topic"
                          placeholder="Topic"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-all"
                        />
                        <ErrorMessage
                          name="topic"
                          component="div"
                          className="text-red-400 text-xs mt-1 font-medium"
                        />
                      </div>

                      <div>
                        <Field
                          type="text"
                          name="comment"
                          placeholder="Type your comment..."
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-all"
                        />
                        <ErrorMessage
                          name="comment"
                          component="div"
                          className="text-red-400 text-xs mt-1 font-medium"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        onClick={handleClick}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                      >
                        Post Comment
                      </motion.button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="lg:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FiMessageCircle className="text-red-400" />
                      Comments ({comments.length})
                    </h3>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {loading ? (
                        <div className="flex justify-center items-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                        </div>
                      ) : (
                        <Commentresults
                          comments={comments}
                          setComments={setComments}
                        />
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white border-b border-red-400 pb-2 flex items-center gap-2">
              <FiDownload className="text-red-400" />
              Download Options
            </h2>

            {data.video_links && Object.keys(data.video_links).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.video_links).map(([resolution, link]) => (
                  <motion.div
                    key={resolution}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-wrap items-center gap-4 bg-gray-800/40 backdrop-blur-md p-4 rounded-2xl border border-gray-700 hover:border-red-400/30 transition-all duration-300"
                  >
                    <div className="bg-gray-700/30 px-4 py-2 rounded-lg text-white font-medium min-w-[80px] text-center">
                      {resolution}
                    </div>

                    <div className="flex items-center gap-1 text-white font-medium">
                      {link.size_gb}
                      <span className="text-gray-400 text-sm">GB</span>
                    </div>

                    <div className="text-gray-300 flex-1 min-w-[100px]">
                      {data.quality || "HD"}
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={link.url}
                        download
                        className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-400/30 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      >
                        <FiDownload />
                        <span className="hidden sm:inline">Download</span>
                      </a>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-white border border-gray-600 hover:border-green-400 hover:text-green-400 rounded-lg transition-all duration-200"
                      >
                        <FiEye />
                        <span className="hidden sm:inline">Watch</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 p-10 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700">
                <img
                  src={nodataGif}
                  alt="No data"
                  className="w-24 h-24 rounded-2xl"
                />
                <p className="text-gray-400 text-lg">
                  No download options available
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
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
