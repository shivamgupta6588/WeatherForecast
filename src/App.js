import React, { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";
import getFormattedData from "./Services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

// A simple spinner component for the loading state
const Loader = () => (
  <div className="flex flex-col justify-center items-center h-full py-20 text-white space-y-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-12 h-12 border-4 border-t-cyan-400 border-white/30 rounded-full"
    />
    <p className="text-xl font-medium">Loading...</p>
  </div>
);

function App() {
  const [query, setQuery] = useState({ q: "Paonta Sahib" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!query.q && !query.lat) return;
      
      const message = query.q ? query.q : "current location...";
      toast.info(`Fetching weather for ${message}`);
      
      setLoading(true);
      try {
        const data = await getFormattedData({ ...query, units });
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
        setWeather(data);
      } catch (error) {
        toast.error("City not found or failed to fetch weather data.");
        setWeather(null); // Clear weather data on error
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-gray-800 to-gray-900"; // Neutral background
    
    const details = weather.details.toLowerCase();
    
    if (details.includes("rain") || details.includes("drizzle")) return "from-slate-600 to-slate-800";
    if (details.includes("smoke") || details.includes("haze") || details.includes("fog")) return "from-gray-500 to-gray-700";
    if (details.includes("clouds")) return "from-sky-700 to-gray-800";
    if (details.includes("clear")) return "from-blue-500 to-cyan-600";
    
    const tempThreshold = units === "metric" ? 25 : 77;
    return weather.temp <= tempThreshold ? "from-cyan-600 to-blue-800" : "from-yellow-600 to-orange-800";
  };

  return (
    <div
      className={`min-h-screen w-full px-4 py-6 bg-gradient-to-br ${formatBackground()} text-white transition-all duration-700`}
    >
      <main className="max-w-screen-md mx-auto flex flex-col">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4"
          style={{ textShadow: '3px 3px 5px rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          WeatherNest 🌤️
        </motion.h1>

        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" exit={{ opacity: 0 }}>
              <Loader />
            </motion.div>
          ) : weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <TimeAndLocation weather={weather} />
              <TemperatureDetails weather={weather} />
              {/* FIX: Reverted to a single forecast component using weather.forecast */}
              <Forecast title="HOURLY FORECAST" forecast={weather.forecast} />
            </motion.div>
          ) : (
             <motion.div 
               key="error"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-20 text-xl text-yellow-300 font-semibold"
             >
               <p>Sorry, we couldn't find that city.</p>
               <p>Please check the spelling and try again!</p>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ToastContainer position="top-right" theme="colored" autoClose={2500} newestOnTop />
    </div>
  );
}

export default App;