import { motion } from "framer-motion";
import { FiDownload, FiEye } from "react-icons/fi";
import { itemVariants } from "./animations";
import nodataGif from "../../../assets/second page/no-data.gif";

const DownloadRow = ({ resolution, link, quality }) => (
  <motion.div
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
    <div className="text-gray-300 flex-1 min-w-[100px]">{quality || "HD"}</div>
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
);

const DownloadOptions = ({ data }) => {
  const links = data.video_links || {};
  const hasLinks = Object.keys(links).length > 0;

  return (
    <motion.div variants={itemVariants}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white border-b border-red-400 pb-2 flex items-center gap-2">
          <FiDownload className="text-red-400" />
          Download Options
        </h2>

        {hasLinks ? (
          <div className="space-y-3">
            {Object.entries(links).map(([resolution, link]) => (
              <DownloadRow
                key={resolution}
                resolution={resolution}
                link={link}
                quality={data.quality}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-10 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700">
            <img src={nodataGif} alt="No data" className="w-24 h-24 rounded-2xl" />
            <p className="text-gray-400 text-lg">No download options available</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { DownloadOptions };
