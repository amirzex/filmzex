import { useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import {
  PanelShell,
  PanelHeader,
  PanelCard,
  panelInputClass,
  panelBtnPrimaryClass,
  panelBtnSecondaryClass,
  panelBtnDangerClass,
} from "@/features/user-panel/components/PanelShell";

const buildUserInfo = () => {
  const defaults = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    nationalCode: "",
    address: "",
    bio: "",
  };

  try {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) return defaults;

    const [firstName = "", ...rest] = (stored.username || "").split(" ");
    return {
      ...defaults,
      firstName,
      lastName: rest.join(" "),
      email: stored.email || "",
      phone: stored.phone || "",
      birthDate: stored.birthDate || "",
    };
  } catch {
    return defaults;
  }
};

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(buildUserInfo);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
    try {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      const updated = {
        ...stored,
        username: `${editedInfo.firstName} ${editedInfo.lastName}`.trim(),
        email: editedInfo.email,
        phone: editedInfo.phone,
        birthDate: editedInfo.birthDate,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      localStorage.setItem("username", updated.username);
      localStorage.setItem("userEmail", updated.email);
    } catch {
      // ignore
    }
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "birthDate", label: "Birth Date", type: "text" },
    { name: "nationalCode", label: "National Code", type: "text" },
  ];

  return (
    <PanelShell className="overflow-x-clip">
      <PanelHeader
        eyebrow="Profile"
        title="Personal Information"
        description="Manage your identity details used across Filmzex."
        actions={
          !isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={panelBtnPrimaryClass}
            >
              <FiEdit />
              Edit Information
            </button>
          ) : (
            <>
              <button type="button" onClick={handleSave} className={panelBtnPrimaryClass}>
                <FiSave />
                Save
              </button>
              <button type="button" onClick={handleCancel} className={panelBtnDangerClass}>
                <FiX />
                Cancel
              </button>
            </>
          )
        }
      />

      <PanelCard className="p-4 sm:p-8">
        <div className="mb-8 flex flex-col items-center gap-4 border-b border-gray-700/60 pb-8 text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600">
              <span className="text-3xl font-bold text-white">
                {(userInfo.firstName[0] || "U").toUpperCase()}
                {(userInfo.lastName[0] || "").toUpperCase()}
              </span>
            </div>
            {isEditing && (
              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full bg-red-600 p-2 transition hover:bg-red-500"
              >
                <FiEdit className="text-sm text-white" />
              </button>
            )}
          </div>
          <div className="min-w-0 w-full">
            <h2 className="break-words text-2xl font-bold text-white">
              {userInfo.firstName} {userInfo.lastName}
            </h2>
            <p className="truncate text-gray-400">{userInfo.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map(({ name, label, type }) => (
            <div key={name}>
              <label className="mb-1.5 block text-xs text-gray-400">{label}</label>
              {isEditing ? (
                <input
                  type={type}
                  name={name}
                  value={editedInfo[name]}
                  onChange={handleInputChange}
                  className={panelInputClass}
                />
              ) : (
                <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white truncate">
                  {userInfo[name] || "—"}
                </div>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs text-gray-400">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={editedInfo.address}
                onChange={handleInputChange}
                rows="3"
                className={panelInputClass}
              />
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white">
                {userInfo.address || "—"}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs text-gray-400">About Me</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedInfo.bio}
                onChange={handleInputChange}
                rows="4"
                className={panelInputClass}
              />
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white">
                {userInfo.bio || "No description added yet"}
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="mt-8 border-t border-gray-700/60 pt-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Change Password</h3>
            <button type="button" className={panelBtnSecondaryClass}>
              Change Password
            </button>
          </div>
        )}
      </PanelCard>
    </PanelShell>
  );
};

export default Account;
