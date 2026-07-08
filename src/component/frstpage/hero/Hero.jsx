import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import star from "../../../assets/landing/icons8-rating-50.png";
import backup from "../../../assets/landing/backup.jpg";
import { FiHeart, FiPlay, FiInfo } from "react-icons/fi";
import Slider from "react-slick";

const Hero = ({ items }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true, 
    arrows: false,
    dotsClass: "slick-dots absolute bottom-8 flex justify-center w-full",
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden ">
      <Slider {...settings}>
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-[70vh] md:h-[85vh] outline-none"
          >
            {/* 1. BACKGROUND LAYER: The Movie Poster/Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.poster || item.poster_url || backup}
                className="w-full h-full object-center object-top" // object-top ensures faces aren't cut off
                alt={item.title}
              />
              {/* The "Cinematic Scrim": Darkens the image so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* 2. CONTENT LAYER: Metadata and Text */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Category Badge */}
                  {item.category || (Array.isArray(item.genre) ? item.genre[0] : item.genre) ? (
                    <span className="inline-block text-rose-500 text-sm font-bold tracking-widest uppercase mb-4 bg-rose-500/10 px-3 py-1 rounded-md">
                      {item.category || (Array.isArray(item.genre) ? item.genre[0] : item.genre)}
                    </span>
                  ) : null}

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl">
                    {item.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 max-w-2xl drop-shadow-md">
                    {item.description ||
                      "Experience the journey of a lifetime in this breathtaking cinematic masterpiece."}
                  </p>

                  {/* Meta Info (Year & Rating) */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      <img src={star} className="w-5 h-5" alt="star" />
                      <span className="text-white font-bold">
                        {item.rating || "N/A"}
                      </span>
                    </div>
                    {(item.year || item.release_year || item.releaseDate) && (
                      <span className="text-gray-400 text-lg">
                        {item.year || item.release_year || item.releaseDate?.split("-")[0]}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate("/team/" + item.id)}
                      className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-xl"
                    >
                      <FiPlay fill="currentColor" /> Play Now
                    </button>

                    <button
                      onClick={() => navigate("/team/" + item.id)}
                      className="flex items-center gap-2 bg-gray-500/30 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <FiInfo /> More Info
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. FAVORITE BUTTON (Top Right) */}
            <button className="absolute top-8 right-8 z-20 bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:text-red-500 hover:bg-white/10 transition-all">
              <FiHeart size={24} />
            </button>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
