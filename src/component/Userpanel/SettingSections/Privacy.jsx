import React from "react";
import { FiEye, FiMail, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Privacy = ({activeSection,settings,handleSettingChange}) => {
  return (
    <div>
      {activeSection === "privacy" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Privacy Settings
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Profile Visibility
              </label>
              <select
                value={settings.profileVisibility}
                onChange={(e) =>
                  handleSettingChange("profileVisibility", e.target.value)
                }
                className="w-full md:w-64 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiMail className="text-gray-400" />
                  <div>
                    <p className="text-white">Show Email</p>
                    <p className="text-xs text-gray-400">
                      Display your email on profile
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange("showEmail", !settings.showEmail)
                  }
                  className={`text-2xl transition-all ${settings.showEmail ? "text-blue-400" : "text-gray-500"}`}
                >
                  {settings.showEmail ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiEye className="text-gray-400" />
                  <div>
                    <p className="text-white">Show Activity</p>
                    <p className="text-xs text-gray-400">
                      Display your recent activity
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange("showActivity", !settings.showActivity)
                  }
                  className={`text-2xl transition-all ${settings.showActivity ? "text-blue-400" : "text-gray-500"}`}
                >
                  {settings.showActivity ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Privacy;
