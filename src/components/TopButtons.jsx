import React from "react";
import { motion } from "framer-motion";

const CITIES = [
  { name: "Delhi", icon: "🏙️" },
  { name: "Mumbai", icon: "🌊" },
  { name: "Shimla", icon: "⛰️" },
  { name: "Dehradun", icon: "🌿" },
  { name: "London", icon: "🌧️" },
];

function TopButtons({ setQuery }) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-around my-6 gap-3">
      {CITIES.map(({ name, icon }) => (
        <motion.button
          key={name}
          whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-white font-medium shadow-md transition-colors hover:shadow-lg"
          onClick={() => setQuery({ q: name })}
        >
          <span>{icon}</span>
          {name}
        </motion.button>
      ))}
    </div>
  );
}

export default TopButtons;