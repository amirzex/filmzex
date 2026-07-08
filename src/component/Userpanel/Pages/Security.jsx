import { useState } from "react";
import {
  FiLock,
  FiShield,
  FiKey,
  FiSmartphone,
  FiMail,
  FiEye,
  FiEyeOff,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiGlobe,
  FiLogOut,
  FiToggleLeft,
  FiToggleRight,
  FiUserCheck,
  // FiFingerprint,
} from "react-icons/fi";

const Security = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    deviceVerification: true,
    suspiciousActivityAlerts: true,
    passwordExpiry: false,
    biometricLogin: false,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: "Login successful",
      device: "Chrome on Windows",
      location: "Tehran, Iran",
      ip: "192.168.1.100",
      time: "2 minutes ago",
      status: "success",
      icon: "💻",
    },
    {
      id: 2,
      action: "Password changed",
      device: "Safari on iPhone",
      location: "Tehran, Iran",
      ip: "192.168.1.105",
      time: "2 hours ago",
      status: "success",
      icon: "📱",
    },
    {
      id: 3,
      action: "Failed login attempt",
      device: "Firefox on Mac",
      location: "Unknown",
      ip: "203.45.67.89",
      time: "1 day ago",
      status: "failed",
      icon: "⚠️",
    },
    {
      id: 4,
      action: "New device connected",
      device: "Edge on Xbox",
      location: "Tehran, Iran",
      ip: "192.168.1.110",
      time: "3 days ago",
      status: "warning",
      icon: "🎮",
    },
  ]);

  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: "Windows PC - Chrome",
      location: "Tehran, Iran",
      ip: "192.168.1.100",
      lastActive: "Now",
      isCurrent: true,
      icon: "💻",
    },
    {
      id: 2,
      name: "iPhone 14 - Safari",
      location: "Tehran, Iran",
      ip: "192.168.1.105",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: "📱",
    },
    {
      id: 3,
      name: "MacBook Pro - Firefox",
      location: "Tehran, Iran",
      ip: "192.168.1.108",
      lastActive: "5 hours ago",
      isCurrent: false,
      icon: "💻",
    },
  ]);

  const [trustedDevices, setTrustedDevices] = useState([
    {
      id: 1,
      name: "Home PC",
      added: "Jan 15, 2024",
      icon: "🏠",
    },
    {
      id: 2,
      name: "iPhone",
      added: "Feb 1, 2024",
      icon: "📱",
    },
  ]);

  const toggleSecuritySetting = (key) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogoutDevice = (deviceId) => {
    setConnectedDevices((devices) => devices.filter((d) => d.id !== deviceId));
  };

  const handleRemoveTrustedDevice = (deviceId) => {
    setTrustedDevices((devices) => devices.filter((d) => d.id !== deviceId));
  };

  return (
    <div className="w-full p-5 bg-gray-800/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Security</h1>
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg">
          <FiShield className="text-xl" />
          <span className="font-semibold">Security Score: 85%</span>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FiShield className="text-blue-400 text-xl" />
            <span className="text-xs text-gray-400">Status</span>
          </div>
          <p className="text-white font-semibold">2FA Enabled</p>
          <p className="text-xs text-gray-400">Last updated: Today</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FiSmartphone className="text-green-400 text-xl" />
            <span className="text-xs text-gray-400">Devices</span>
          </div>
          <p className="text-white font-semibold">
            {connectedDevices.length} Active
          </p>
          <p className="text-xs text-gray-400">
            {trustedDevices.length} Trusted
          </p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FiClock className="text-yellow-400 text-xl" />
            <span className="text-xs text-gray-400">Last Login</span>
          </div>
          <p className="text-white font-semibold">2 minutes ago</p>
          <p className="text-xs text-gray-400">Chrome on Windows</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FiAlertCircle className="text-purple-400 text-xl" />
            <span className="text-xs text-gray-400">Failed Attempts</span>
          </div>
          <p className="text-white font-semibold">3 attempts</p>
          <p className="text-xs text-gray-400">Last 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Password & 2FA */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password Section */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiLock className="text-blue-400" />
              Change Password
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-gray-300 mb-2 text-sm">
                  Current Password
                </label>
                <input
                  type={showPassword.current ? "text" : "password"}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all pr-10"
                />
                <button
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-white"
                >
                  {showPassword.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-gray-300 mb-2 text-sm">
                  New Password
                </label>
                <input
                  type={showPassword.new ? "text" : "password"}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all pr-10"
                />
                <button
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-white"
                >
                  {showPassword.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-gray-300 mb-2 text-sm">
                  Confirm New Password
                </label>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all pr-10"
                />
                <button
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-white"
                >
                  {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-2">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4].map((strength) => (
                    <div
                      key={strength}
                      className={`h-1 flex-1 rounded-full ${
                        strength <= 2 ? "bg-yellow-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-yellow-500">Medium Strength</p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all">
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiKey className="text-purple-400" />
              Two-Factor Authentication (2FA)
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiShield className="text-blue-400" />
                  <div>
                    <p className="text-white">Enable 2FA</p>
                    <p className="text-xs text-gray-400">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSecuritySetting("twoFactorAuth")}
                  className={`text-2xl transition-all ${securitySettings.twoFactorAuth ? "text-blue-400" : "text-gray-500"}`}
                >
                  {securitySettings.twoFactorAuth ? (
                    <FiToggleRight />
                  ) : (
                    <FiToggleLeft />
                  )}
                </button>
              </div>

              {securitySettings.twoFactorAuth && (
                <div className="bg-gray-700/20 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-3">
                    Scan this QR code with Google Authenticator or Authy:
                  </p>
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-3 flex items-center justify-center rounded-lg">
                    <span className="text-4xl">📱</span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    Or enter code: ABC-DEF-GHI
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiClock className="text-yellow-400" />
              Recent Activity
            </h2>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-all"
                >
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">
                        {activity.action}
                      </p>
                      {activity.status === "success" && (
                        <FiCheckCircle className="text-green-400" size={14} />
                      )}
                      {activity.status === "failed" && (
                        <FiXCircle className="text-red-400" size={14} />
                      )}
                      {activity.status === "warning" && (
                        <FiAlertCircle className="text-yellow-400" size={14} />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span>{activity.device}</span>
                      <span>{activity.location}</span>
                      <span>{activity.ip}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Devices & Security Settings */}
        <div className="space-y-6">
          {/* Connected Devices */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiSmartphone className="text-green-400" />
              Connected Devices
            </h2>

            <div className="space-y-3">
              {connectedDevices.map((device) => (
                <div key={device.id} className="p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{device.icon}</span>
                      <div>
                        <p className="text-white font-medium">
                          {device.name}
                          {device.isCurrent && (
                            <span className="ml-2 text-xs text-green-400">
                              (Current)
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">
                          {device.location} • {device.ip}
                        </p>
                      </div>
                    </div>
                    {!device.isCurrent && (
                      <button
                        onClick={() => handleLogoutDevice(device.id)}
                        className="text-gray-400 hover:text-red-500 transition-all"
                        title="Logout device"
                      >
                        <FiLogOut size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Last active: {device.lastActive}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Devices */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiUserCheck className="text-blue-400" />
              Trusted Devices
            </h2>

            <div className="space-y-3">
              {trustedDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{device.icon}</span>
                    <div>
                      <p className="text-white">{device.name}</p>
                      <p className="text-xs text-gray-400">
                        Added: {device.added}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveTrustedDevice(device.id)}
                    className="text-gray-400 hover:text-red-500 transition-all text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
              <FiShield className="text-purple-400" />
              Security Preferences
            </h2>

            <div className="space-y-3">
              {[
                {
                  key: "loginAlerts",
                  label: "Login Alerts",
                  desc: "Email when new device logs in",
                  icon: FiMail,
                },
                {
                  key: "deviceVerification",
                  label: "Device Verification",
                  desc: "Verify new devices",
                  icon: FiSmartphone,
                },
                {
                  key: "suspiciousActivityAlerts",
                  label: "Suspicious Activity",
                  desc: "Alert on unusual activity",
                  icon: FiAlertCircle,
                },
                {
                  key: "passwordExpiry",
                  label: "Password Expiry",
                  desc: "Change password every 90 days",
                  icon: FiClock,
                },
                {
                  key: "biometricLogin",
                  label: "Biometric Login",
                  desc: "Use fingerprint/face ID",
                  icon: FiUserCheck,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="text-gray-400" />
                    <div>
                      <p className="text-white">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSecuritySetting(item.key)}
                    className={`text-2xl transition-all ${securitySettings[item.key] ? "text-blue-400" : "text-gray-500"}`}
                  >
                    {securitySettings[item.key] ? (
                      <FiToggleRight />
                    ) : (
                      <FiToggleLeft />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Login History Link */}
          <button className="w-full bg-gray-800/40 backdrop-blur-md rounded-xl p-4 text-left hover:bg-gray-700/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiGlobe className="text-blue-400" />
                <div>
                  <p className="text-white font-medium">Full Login History</p>
                  <p className="text-xs text-gray-400">
                    View all login attempts
                  </p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
