import { useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

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
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);

    // Persist the edited info back to localStorage
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
      // ignore storage errors
    }
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  return (
    <div className="w-full p-5  bg-gray-800/40 backdrop-blur-md">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Personal Information</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <FiEdit />
            <span>Edit Information</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FiSave />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FiX />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-8">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-700">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {userInfo.firstName[0]}
                {userInfo.lastName[0]}
              </span>
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all">
                <FiEdit className="text-white text-sm" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {userInfo.firstName} {userInfo.lastName}
            </h2>
            <p className="text-gray-400">{userInfo.email}</p>
          </div>
        </div>

        {/* Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedInfo.firstName}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedInfo.lastName}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedInfo.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedInfo.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.phone}
              </div>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              Birth Date
            </label>
            {isEditing ? (
              <input
                type="text"
                name="birthDate"
                value={editedInfo.birthDate}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.birthDate}
              </div>
            )}
          </div>

          {/* National Code */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              National Code
            </label>
            {isEditing ? (
              <input
                type="text"
                name="nationalCode"
                value={editedInfo.nationalCode}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.nationalCode}
              </div>
            )}
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2 text-sm">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={editedInfo.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.address}
              </div>
            )}
          </div>

          {/* Bio - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2 text-sm">About Me</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedInfo.bio}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-lg px-4 py-3 text-white">
                {userInfo.bio || "No description added yet"}
              </div>
            )}
          </div>
        </div>

        {/* Change Password Section */}
        {!isEditing && (
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Change Password
            </h3>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all">
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
