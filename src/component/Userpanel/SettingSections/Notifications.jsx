import React from "react";
import { FiBell, FiMail, FiSmartphone, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Notifications = ({ activeSection, settings, handleSettingChange }) => {
  return (
    <div>
      {" "}
      {activeSection === "notifications" && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
            Notification Settings
          </h2>

          <div className="space-y-4">
            {[
              {
                key: "emailNotifications",
                label: "Email Notifications",
                desc: "Receive notifications via email",
                icon: FiMail,
              },
              {
                key: "pushNotifications",
                label: "Push Notifications",
                desc: "Receive browser notifications",
                icon: FiBell,
              },
              {
                key: "smsNotifications",
                label: "SMS Notifications",
                desc: "Receive text messages",
                icon: FiSmartphone,
              },
              {
                key: "marketingEmails",
                label: "Marketing Emails",
                desc: "Receive promotional offers",
                icon: FiMail,
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
                  onClick={() =>
                    handleSettingChange(item.key, !settings[item.key])
                  }
                  className={`text-2xl transition-all ${settings[item.key] ? "text-blue-400" : "text-gray-500"}`}
                >
                  {settings[item.key] ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
