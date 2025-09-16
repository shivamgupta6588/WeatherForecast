import React, { useState } from "react";
import { BiCurrentLocation, BiSearchAlt2 } from "react-icons/bi";
import { motion } from "framer-motion";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city) {
      setQuery({ q: city });
      setCity(""); // Clear input after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setQuery({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-6">
      {/* Search Bar */}
      <div className="flex flex-row items-center w-full sm:w-3/4 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transition duration-300 focus-within:bg-black/40">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          className="bg-transparent placeholder-white/70 focus:outline-none text-white w-full text-lg"
        />
        <motion.div whileTap={{ scale: 0.9 }}>
          <BiSearchAlt2
            size={28}
            className="cursor-pointer text-white hover:text-cyan-300 transition-colors"
            onClick={handleSearchClick}
          />
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} className="ml-2">
          <BiCurrentLocation
            size={28}
            className="cursor-pointer text-white hover:text-cyan-300 transition-colors"
            onClick={handleLocationClick}
          />
        </motion.div>
      </div>

      {/* Unit Toggle Switch */}
      <div className="flex items-center p-1 rounded-full bg-black/20 backdrop-blur-sm shadow-lg">
        <button
          onClick={() => setUnits("metric")}
          className={`px-4 py-1.5 rounded-full text-base font-medium relative transition`}
        >
          {units === "metric" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/40 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">°C</span>
        </button>
        <button
          onClick={() => setUnits("imperial")}
          className={`px-4 py-1.5 rounded-full text-base font-medium relative transition`}
        >
          {units === "imperial" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/40 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">°F</span>
        </button>
      </div>
    </div>
  );
}

export default Inputs;