import React from "react";

const LanguageAndRegion = ({activeSection,handleSettingChange,settings}) => {
  return (
    <div>
      {" "}
      {activeSection === "language" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Language & Region
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  handleSettingChange("language", e.target.value)
                }
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="persian">Persian</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  handleSettingChange("timezone", e.target.value)
                }
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="UTC-8">UTC-8 (Los Angeles)</option>
                <option value="UTC-5">UTC-5 (New York)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC+3:30">UTC+3:30 (Tehran)</option>
                <option value="UTC+8">UTC+8 (Singapore)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Date Format
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) =>
                  handleSettingChange("dateFormat", e.target.value)
                }
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="YYYY-MM-DD">2024-02-26</option>
                <option value="MM/DD/YYYY">02/26/2024</option>
                <option value="DD/MM/YYYY">26/02/2024</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageAndRegion;
