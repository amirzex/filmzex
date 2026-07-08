import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/landing/logo-removebg-preview.png";
import panel from "../../assets/landing/icons8-profile-50.png";
import Search from "./Search";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const authStatus = localStorage.getItem("isAuthenticated");

    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(authStatus === "true");
    }
  }, []);

  const linkStyles = ({ isActive }) =>
    `relative text-sm font-semibold tracking-wider transition-all duration-300 py-2 uppercase ${
      isActive
        ? "text-red-500 after:w-full"
        : "text-gray-300 hover:text-white after:w-0"
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300`;

  return (
    <header className="sticky w-full top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b py-4 border-white/10 px-4 sm:px-6 md:px-12 transition-all duration-300">
      <div className="mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-4 md:gap-12">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden text-gray-200 hover:text-white transition-colors p-1"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-9 sm:h-10 w-auto object-contain hover:opacity-85 transition-opacity"
              alt="Logo"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={linkStyles}>
              Home
            </NavLink>
            <NavLink to="/Movie" className={linkStyles}>
              Movies
            </NavLink>
            <NavLink to="/TVshow" className={linkStyles}>
              TV Shows
            </NavLink>
            <NavLink to="/Blogstyle" className={linkStyles}>
              Blog
            </NavLink>
          </nav>
        </div>

        {/* Right Side: Search, Sign Up (hidden when logged in), & Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Search Box Wrapper */}
          <div className="relative ">
            <Search />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Sign Up Button - Hidden when user is authenticated */}
            {!isAuthenticated && (
              <Link
                to="/register"
                className="relative hidden sm:inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-bold text-white rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/30 hover:scale-105"
              >
                <span className="text-xs tracking-wider uppercase">
                  Sign Up
                </span>
              </Link>
            )}

            {/* Profile Avatar with Tooltip */}
            <div className="relative group">
              <Link
                to={isAuthenticated ? "/userpanel/dashboard" : "/register"}
                className="relative block h-10 w-10 overflow-hidden rounded-full border border-white/10 hover:border-red-500 transition-colors"
              >
                {isAuthenticated && user ? (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-500 to-purple-600 text-white font-bold text-sm">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                ) : (
                  <img
                    className="h-full w-full object-cover bg-slate-800"
                    src={panel}
                    alt="User Profile"
                  />
                )}
              </Link>

              {/* Tooltip showing username when logged in */}
              {isAuthenticated && user && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded-md border border-gray-700 pointer-events-none">
                  {user.username}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <nav className="lg:hidden mt-4 flex flex-col gap-1 border-t border-white/10 pt-4">
          {[
            { to: "/", label: "Home" },
            { to: "/Movie", label: "Movies" },
            { to: "/TVshow", label: "TV Shows" },
            { to: "/Blogstyle", label: "Blog" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-red-500/15 text-red-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
