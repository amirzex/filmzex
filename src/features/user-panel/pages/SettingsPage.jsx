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
} from "react-icons/fi";
import Profile from "@/features/user-panel/settings/Profile";
import Privacy from "@/features/user-panel/settings/Privacy";
import Notifications from "@/features/user-panel/settings/Notifications";
import Appearance from "@/features/user-panel/settings/Appearance";
import LanguageAndRegion from "@/features/user-panel/settings/LanguageRegion";
import Security from "@/features/user-panel/settings/Security";
import Playback from "@/features/user-panel/settings/Playback";
import DataAndStorage from "@/features/user-panel/settings/DataStorage";
import {
  PanelShell,
  PanelHeader,
  PanelCard,
  panelBtnPrimaryClass,
} from "@/features/user-panel/components/PanelShell";

const Setting = () => {
  const [settings, setSettings] = useState({
    username: "alireza_m",
    email: "alireza@email.com",
    fullName: "Alireza Mohammadi",
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: false,
    theme: "dark",
    fontSize: "medium",
    compactMode: false,
    language: "english",
    timezone: "UTC+3:30",
    dateFormat: "YYYY-MM-DD",
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    autoplay: true,
    quality: "auto",
    subtitles: true,
    volume: 80,
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSaveSettings = () => {
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
    <PanelShell>
      <PanelHeader
        eyebrow="Preferences"
        title="Settings"
        description="Tune profile, privacy, playback, and more."
        actions={
          <button
            type="button"
            onClick={handleSaveSettings}
            className={panelBtnPrimaryClass}
          >
            <FiSave />
            Save Changes
          </button>
        }
      />

      {isSaved && (
        <div className="fixed right-5 top-5 z-50 rounded-xl border border-emerald-500/30 bg-emerald-600/90 px-5 py-3 text-sm text-white shadow-lg backdrop-blur">
          Settings saved successfully!
        </div>
      )}

      <PanelCard className="mb-6 overflow-x-auto p-3 sm:p-4">
        <div className="flex flex-row gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex flex-shrink-0 flex-row items-center gap-2 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap transition sm:gap-3 sm:px-4 sm:py-3 ${
                activeSection === section.id
                  ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <section.icon size={18} />
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </PanelCard>

      <PanelCard className="p-5 sm:p-6">
        <Profile
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <Privacy
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <Notifications
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <Appearance
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <LanguageAndRegion
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <Security
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <Playback
          activeSection={activeSection}
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      </PanelCard>

      <div className="mt-6">
        <DataAndStorage />
      </div>
    </PanelShell>
  );
};

export default Setting;
