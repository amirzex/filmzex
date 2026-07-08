import {
  LayoutDashboard,
  User,
  Heart,
  ShoppingBag,
  Settings,
  Shield,
  Home,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LeftSide = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/userpanel/Dashboard",
    },
    { id: 2, title: "Account", icon: User, path: "/userpanel/account" },
    { id: 3, title: "Favorite", icon: Heart, path: "/userpanel/favorite" },
    { id: 4, title: "Buy", icon: ShoppingBag, path: "/userpanel/buy" },
    { id: 5, title: "Setting", icon: Settings, path: "/userpanel/setting" },
    { id: 6, title: "Security", icon: Shield, path: "/userpanel/security" },
    { id: 7, title: "Home", icon: Home, path: "/" },
  ];

  const handleLogout = () => {
    const keys = [
      "user",
      "isAuthenticated",
      "username",
      "userEmail",
      "user_token",
      "token",
      "comments",
    ];
    keys.forEach((key) => localStorage.removeItem(key));
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return (user.username || user.email || "U").charAt(0).toUpperCase();
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-md flex flex-col justify-between w-[260px] p-5 gap-4 h-screen sticky top-0 border-r border-gray-700">
      {/* User Profile */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {getUserInitials()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">
            {user?.username || "User"}
          </p>
          <p className="text-gray-400 text-xs truncate">{user?.email || ""}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1">
        {menuItems?.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-300 ${
                  isActive
                    ? "bg-red-500/20 text-red-400"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 border border-red-500/20"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LeftSide;
