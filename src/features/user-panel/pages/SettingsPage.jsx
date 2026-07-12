import { useState } from "react";
import {
  FiBell,
  FiLock,
  FiEye,
  FiGlobe,
  FiMoon,
  FiUser,
  FiSave,
  FiVolume2,
  FiDownload,
} from "react-icons/fi";
import Profile from "@/features/user-panel/settings/Profile";
import Privacy from "@/features/user-panel/settings/Privacy";
import Notifications from "@/features/user-panel/settings/Notifications";
import Appearance from "@/features/user-panel/settings/Appearance";
import LanguageAndRegion from "@/features/user-panel/settings/LanguageRegion";
import Security from "@/features/user-panel/settings/Security";
import Playback from "@/features/user-panel/settings/Playback";
import DataAndStorage from "@/features/user-panel/settings/DataStorage";

const Setting = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    username: "alireza_m",
    email: "alireza@email.com",
    fullName: "Alireza Mohammadi",

    // Privacy Settings
    profileVisibility: "public", // public, friends, private
    showEmail: false,
    showActivity: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: false,

    // Appearance
    theme: "dark", // dark, light, system
    fontSize: "medium", // small, medium, large
    compactMode: false,

    // Language & Region
    language: "english",
    timezone: "UTC+3:30",
    dateFormat: "YYYY-MM-DD",

    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30, // minutes

    // Playback Settings
    autoplay: true,
    quality: "auto", // auto, 1080p, 720p, 480p
    subtitles: true,
    volume: 80,
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsSaved(false);
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const sections = [
    { id: "profile", name: "Profile", icon: FiUser },
    { id: "privacy", name: "Privacy", icon: FiEye },
    { id: "notifications", name: "Notifications", icon: FiBell },
    { id: "appearance", name: "Appearance", icon: FiMoon },
    { id: "language", name: "Language & Region", icon: FiGlobe },
    { id: "security", name: "Security", icon: FiLock },
    { id: "playback", name: "Playback", icon: FiVolume2 },
  ];

  return (
    <div className="w-full p-5 bg-gray-800/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          <FiSave />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Save Notification */}
      {isSaved && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col gap-6 w-full">
        {/* Sidebar Navigation */}
        <div className="w-full flex flex-row justify-center items-center">
          <div className="bg-gray-800/40 backdrop-blur-md w-full flex flex-row gap-2 sm:gap-5 rounded-xl p-3 sm:p-4 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-shrink-0 flex-row items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-red-500/90 text-white"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <section.icon size={18} />
                <span className="text-sm sm:text-base">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6">
            {/* Profile Section */}
            <Profile
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Privacy Section */}

            <Privacy
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Notifications Section */}
            <Notifications
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Appearance Section */}
            <Appearance
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Language & Region Section */}

            <LanguageAndRegion
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Security Section */}
            <Security
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            {/* Playback Section */}
            <Playback
              activeSection={activeSection}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Data & Storage Section  */}
          <DataAndStorage />
          
        </div>
      </div>
    </div>
  );
};

export default Setting;
