import React from "react";
import { motion } from "framer-motion";

function Forecast({ title, forecast }) {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return null;
  }

  const grouped = forecast.reduce((acc, item) => {
    const [day] = item.title.split(", ");
    if (!acc[day]) acc[day] = [];
    acc[day].push({ time: item.title.split(", ")[1], temp: item.temp, icon: item.icon });
    return acc;
  }, {});

  const textShadow = { textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' };

  return (
    <section className="w-full md:w-screen md:relative md:left-1/2 md:-translate-x-1/2 bg-black/10 mt-10 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center" style={textShadow}>{title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(grouped).map(([day, items], idx) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-black/20 backdrop-blur-md rounded-3xl p-5 shadow-lg flex flex-col"
            >
              <h3 className="font-semibold mb-4 text-xl text-cyan-200">{day}</h3>

              {/* Removed horizontal scroll and changed to a grid layout for hourly items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    className="flex flex-col items-center justify-between min-w-[90px] bg-white/10 rounded-2xl p-3 shadow-md cursor-pointer"
                  >
                    <p className="text-white/90 text-sm">{item.time}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt="weather icon"
                      className="w-16 h-16"
                    />
                    <p className="font-bold text-xl">{`${item.temp.toFixed()}°`}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Forecast;