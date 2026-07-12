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
      path: "/userpanel/dashboard",
    },
    { id: 2, title: "Account", icon: User, path: "/userpanel/account" },
    { id: 3, title: "Favorite", icon: Heart, path: "/userpanel/favorite" },
    { id: 4, title: "Subscription", icon: ShoppingBag, path: "/userpanel/buy" },
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
    <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-xl border border-gray-700/60 bg-gradient-to-b from-gray-900 via-gray-900 to-black p-4 lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:justify-between lg:rounded-xl lg:p-5">
      <div className="pointer-events-none absolute -top-16 left-0 h-40 w-40 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative flex items-center gap-3 border-b border-gray-700/60 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 font-bold text-white">
          {getUserInitials()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">
            {user?.username || "User"}
          </p>
          <p className="truncate text-xs text-gray-400">{user?.email || ""}</p>
        </div>
      </div>

      <div className="relative flex flex-row gap-1 overflow-x-auto lg:flex-1 lg:flex-col lg:overflow-visible">
        {menuItems?.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `mb-0 flex flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-xl p-3 transition-all duration-300 lg:mb-1 ${
                  isActive
                    ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="relative flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:text-red-300"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LeftSide;
