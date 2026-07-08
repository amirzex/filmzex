import instagram from "../../assets/landing/icons8-instagram-48.png";
import telegram from "../../assets/landing/icons8-telegram-app-48.png";
import facebook from "../../assets/landing/icons8-facebook-48.png";
import linkdin from "../../assets/landing/icons8-linkedin-48.png";
import x from "../../assets/landing/icons8-x-50.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaFilm, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

const footerLinks = [
  { to: "/contactus", label: "Contact Us" },
  { to: "/DMCA", label: "DMCA" },
  { to: "/Role", label: "Roles" },
  { to: "/CommonQuestion", label: "Common Question" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/amirhossein__nasrolahpour?igsh=MWpqZDM1dWtva3Bydw%3D%3D&utm_source=qr",
    icon: instagram,
    label: "Instagram",
    color: "hover:border-pink-500 hover:bg-pink-500/10",
  },
  {
    href: "https://t.me/AMIRZEX73",
    icon: telegram,
    label: "Telegram",
    color: "hover:border-blue-400 hover:bg-blue-400/10",
  },
  {
    href: "https://www.facebook.com/",
    icon: facebook,
    label: "Facebook",
    color: "hover:border-blue-600 hover:bg-blue-600/10",
  },
  {
    href: "https://www.linkedin.com/in/amirhosseinnrlp",
    icon: linkdin,
    label: "LinkedIn",
    color: "hover:border-blue-500 hover:bg-blue-500/10",
  },
  {
    href: "https://x.com/",
    icon: x,
    label: "X",
    color: "hover:border-gray-400 hover:bg-white/10",
  },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="mt-20 px-4 md:px-8 lg:px-12 relative">
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-110 transition-all duration-300 ${
          showScrollTop ? "visible" : "invisible"
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        {/* Decorative gradient line at top */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="flex flex-col items-center gap-10 px-6 py-12 md:px-10 md:py-16">
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 w-full"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="flex items-center gap-3">
              <FaFilm className="text-red-500 text-2xl" />
              <span className="text-lg md:text-xl font-bold uppercase tracking-[0.35em] bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                CineWorld
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {footerLinks.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm md:text-base text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links with Tooltips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {socialLinks.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                    {item.label}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 rotate-45 border-r border-b border-white/10"></div>
                  </div>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ${item.color}`}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Footer Bottom */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          >
            <p className="text-sm md:text-base text-gray-400">
              Designed with{" "}
              <FaHeart className="inline text-red-500 animate-pulse mx-1" /> by{" "}
              <span className="text-red-300 font-medium hover:text-red-400 transition-colors">
                Amirhossein Nasrolahpour
              </span>
            </p>
            <span className="hidden sm:inline text-gray-600">•</span>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} CineWorld. All rights reserved.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-x-16 translate-y-16" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl translate-x-16 -translate-y-16" />
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
