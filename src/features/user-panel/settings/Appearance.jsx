import React from "react";
import { FiLayers, FiMonitor, FiMoon, FiSun, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Appearance = ({ activeSection, settings, handleSettingChange }) => {
  return (
    <div>
      {" "}
      {activeSection === "appearance" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Appearance
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Theme</label>
              <div className="flex gap-3">
                {[
                  { value: "dark", label: "Dark", icon: FiMoon },
                  { value: "light", label: "Light", icon: FiSun },
                  { value: "system", label: "System", icon: FiMonitor },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSettingChange("theme", theme.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      settings.theme === theme.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <theme.icon />
                    <span>{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Font Size
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) =>
                  handleSettingChange("fontSize", e.target.value)
                }
                className="w-full md:w-64 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FiLayers className="text-gray-400" />
                <div>
                  <p className="text-white">Compact Mode</p>
                  <p className="text-xs text-gray-400">Use compact layout</p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange("compactMode", !settings.compactMode)
                }
                className={`text-2xl transition-all ${settings.compactMode ? "text-blue-400" : "text-gray-500"}`}
              >
                {settings.compactMode ? <FiToggleRight /> : <FiToggleLeft />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appearance;
