import { motion } from "framer-motion";
import { FiDownload, FiEye, FiLink, FiFileText } from "react-icons/fi";
import { itemVariants } from "@/features/movie-detail/animations";
import nodataGif from "@/assets/detail/no-data.gif";

const QUALITY_LABELS = {
  quality1080p: "1080p",
  quality720p: "720p",
  quality480p: "480p",
  quality2160p: "4K",
};

// Supports the new `downloadLinks` shape (string URLs keyed by quality plus
// `magnet`/`subtitle`) and the legacy `video_links` shape ({ size_gb, url }).
const normalizeLinks = (raw = {}) => {
  const videos = [];
  let magnet = null;
  let subtitle = null;

  Object.entries(raw).forEach(([key, value]) => {
    if (!value) return;

    if (key === "magnet") {
      magnet = value;
    } else if (key === "subtitle") {
      subtitle = value;
    } else if (typeof value === "object") {
      videos.push({
        resolution: QUALITY_LABELS[key] || key,
        url: value.url,
        size: value.size_gb,
      });
    } else {
      videos.push({
        resolution: QUALITY_LABELS[key] || key,
        url: value,
      });
    }
  });

  return { videos, magnet, subtitle };
};

const DownloadRow = ({ resolution, url, size, quality }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-wrap items-center gap-4 bg-gray-800/40 backdrop-blur-md p-4 rounded-2xl border border-gray-700 hover:border-red-400/30 transition-all duration-300"
  >
    <div className="bg-gray-700/30 px-4 py-2 rounded-lg text-white font-medium min-w-[80px] text-center">
      {resolution}
    </div>
    {size && (
      <div className="flex items-center gap-1 text-white font-medium">
        {size}
        <span className="text-gray-400 text-sm">GB</span>
      </div>
    )}
    <div className="text-gray-300 flex-1 min-w-[100px]">{quality || "HD"}</div>
    <div className="flex gap-2">
      <a
        href={url}
        download
        className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-400/30 hover:bg-red-500/10 rounded-lg transition-all duration-200"
      >
        <FiDownload />
        <span className="hidden sm:inline">Download</span>
      </a>
      <a
        href={url}
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

const ExtraRow = ({ icon: Icon, label, description, href, actionLabel }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-wrap items-center gap-4 bg-gray-800/40 backdrop-blur-md p-4 rounded-2xl border border-gray-700 hover:border-red-400/30 transition-all duration-300"
  >
    <div className="bg-gray-700/30 px-4 py-2 rounded-lg text-white font-medium min-w-[80px] text-center flex items-center justify-center gap-2">
      <Icon className="text-red-400" />
      {label}
    </div>
    <div className="text-gray-300 flex-1 min-w-[100px]">{description}</div>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-400/30 hover:bg-red-500/10 rounded-lg transition-all duration-200"
    >
      <Icon />
      <span className="hidden sm:inline">{actionLabel}</span>
    </a>
  </motion.div>
);

const DownloadOptions = ({ data }) => {
  const { videos, magnet, subtitle } = normalizeLinks(
    data.downloadLinks || data.video_links || {}
  );
  const hasLinks = videos.length > 0 || magnet || subtitle;

  return (
    <motion.div variants={itemVariants}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white border-b border-red-400 pb-2 flex items-center gap-2">
          <FiDownload className="text-red-400" />
          Download Options
        </h2>

        {hasLinks ? (
          <div className="space-y-3">
            {videos.map((video) => (
              <DownloadRow
                key={video.resolution}
                resolution={video.resolution}
                url={video.url}
                size={video.size}
                quality={data.quality}
              />
            ))}

            {magnet && (
              <ExtraRow
                icon={FiLink}
                label="Torrent"
                description="Download via magnet link"
                href={magnet}
                actionLabel="Open Magnet"
              />
            )}

            {subtitle && (
              <ExtraRow
                icon={FiFileText}
                label="Subtitle"
                description="Download subtitle file (.srt)"
                href={subtitle}
                actionLabel="Download"
              />
            )}
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
