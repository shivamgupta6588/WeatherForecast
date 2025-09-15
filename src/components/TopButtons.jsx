import React from "react";
import { motion } from "framer-motion";

function TopButtons({ setQuery }) {
  const cities = ["Delhi", "Mumbai", "Shimla", "Dehradun", "London"];

  return (
    <div className="flex flex-wrap justify-center sm:justify-around my-6 gap-3">
      {cities.map((city) => (
        <motion.button
          key={city}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-black/20 backdrop-blur-sm px-5 py-2 rounded-full text-white font-medium shadow-md transition-colors"
          onClick={() => setQuery({ q: city })}
        >
          {city}
        </motion.button>
      ))}
    </div>
  );
}

export default TopButtons;