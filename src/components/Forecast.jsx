import React from "react";
import { motion } from "framer-motion";

function Forecast({ title, forecast }) {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return null;
  }

  const grouped = forecast.reduce((acc, item) => {
    const [day] = item.title.split(", ");
    if (!acc[day]) acc[day] = [];
    const parts = item.title.split(" | ");
    acc[day].push({ time: parts[1] ?? parts[0], temp: item.temp, icon: item.icon });
    return acc;
  }, {});

  const textShadow = { textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' };

  return (
    <section className="w-full mt-10">
      <div className="py-6 text-white">
        <h2 className="text-2xl font-bold mb-5 text-center tracking-wide uppercase opacity-80" style={textShadow}>
          {title}
        </h2>

        <div className="flex flex-col gap-5">
          {Object.entries(grouped).map(([day, items], idx) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-lg"
            >
              {/* Day header with summary */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-bold text-lg text-cyan-200">{day}</h3>
                <span className="text-sm opacity-70">
                  {items.length > 0 && (() => {
                    const { min, max } = items.reduce(
                      (acc, i) => ({ min: Math.min(acc.min, i.temp), max: Math.max(acc.max, i.temp) }),
                      { min: Infinity, max: -Infinity }
                    );
                    return `${Math.round(min)}° – ${Math.round(max)}°`;
                  })()}
                </span>
              </div>

              {/* Horizontal scrollable hourly strip */}
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ scale: 1.07, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                    className="flex flex-col items-center justify-between flex-shrink-0 w-[80px] bg-white/10 rounded-2xl py-3 px-2 shadow cursor-pointer transition-colors"
                  >
                    <p className="text-white/80 text-xs font-medium">{item.time}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt="weather icon"
                      className="w-12 h-12"
                    />
                    <p className="font-bold text-lg">{`${item.temp.toFixed()}°`}</p>
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