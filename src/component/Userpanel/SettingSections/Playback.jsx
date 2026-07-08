import React from "react";
import { FiEye, FiToggleLeft, FiToggleRight, FiVolume2 } from "react-icons/fi";

const Playback = ({ activeSection, settings, handleSettingChange }) => {
  return (
    <div>
      {" "}
      {activeSection === "playback" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Playback Settings
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FiVolume2 className="text-gray-400" />
                <div>
                  <p className="text-white">Autoplay</p>
                  <p className="text-xs text-gray-400">
                    Automatically play next episode
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange("autoplay", !settings.autoplay)
                }
                className={`text-2xl transition-all ${settings.autoplay ? "text-blue-400" : "text-gray-500"}`}
              >
                {settings.autoplay ? <FiToggleRight /> : <FiToggleLeft />}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FiEye className="text-gray-400" />
                <div>
                  <p className="text-white">Subtitles</p>
                  <p className="text-xs text-gray-400">
                    Show subtitles by default
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange("subtitles", !settings.subtitles)
                }
                className={`text-2xl transition-all ${settings.subtitles ? "text-blue-400" : "text-gray-500"}`}
              >
                {settings.subtitles ? <FiToggleRight /> : <FiToggleLeft />}
              </button>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Video Quality
              </label>
              <select
                value={settings.quality}
                onChange={(e) => handleSettingChange("quality", e.target.value)}
                className="w-full md:w-64 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="auto">Auto</option>
                <option value="1080p">1080p (Full HD)</option>
                <option value="720p">720p (HD)</option>
                <option value="480p">480p (SD)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Default Volume
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) =>
                    handleSettingChange("volume", parseInt(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white w-12">{settings.volume}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playback;
