import React, { useState } from "react";
import { FiBell, FiEye, FiEyeOff, FiShield, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Security = ({ activeSection, settings, handleSettingChange }) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <div>
      {" "}
      {activeSection === "security" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Security Settings
          </h2>

          <div className="space-y-6">
            {/* Change Password */}
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Change Password</h3>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all">
                  Update Password
                </button>
              </div>
            </div>

            {/* Security Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiShield className="text-gray-400" />
                  <div>
                    <p className="text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400">
                      Add extra security to your account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      "twoFactorAuth",
                      !settings.twoFactorAuth,
                    )
                  }
                  className={`text-2xl transition-all ${settings.twoFactorAuth ? "text-blue-400" : "text-gray-500"}`}
                >
                  {settings.twoFactorAuth ? (
                    <FiToggleRight />
                  ) : (
                    <FiToggleLeft />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiBell className="text-gray-400" />
                  <div>
                    <p className="text-white">Login Alerts</p>
                    <p className="text-xs text-gray-400">
                      Get notified of new logins
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange("loginAlerts", !settings.loginAlerts)
                  }
                  className={`text-2xl transition-all ${settings.loginAlerts ? "text-blue-400" : "text-gray-500"}`}
                >
                  {settings.loginAlerts ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleSettingChange(
                      "sessionTimeout",
                      parseInt(e.target.value),
                    )
                  }
                  min="5"
                  max="120"
                  className="w-full md:w-64 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
