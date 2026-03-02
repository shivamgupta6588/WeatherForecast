import React from "react";
import { motion } from "framer-motion";

const CITY_ICONS = {
  Delhi: "🏙️",
  Mumbai: "🌊",
  Shimla: "⛰️",
  Dehradun: "🌿",
  London: "🌧️",
};

function TopButtons({ setQuery }) {
  const cities = ["Delhi", "Mumbai", "Shimla", "Dehradun", "London"];

  return (
    <div className="flex flex-wrap justify-center sm:justify-around my-6 gap-3">
      {cities.map((city) => (
        <motion.button
          key={city}
          whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-white font-medium shadow-md transition-colors hover:shadow-lg"
          onClick={() => setQuery({ q: city })}
        >
          <span>{CITY_ICONS[city]}</span>
          {city}
        </motion.button>
      ))}
    </div>
  );
}

export default TopButtons;