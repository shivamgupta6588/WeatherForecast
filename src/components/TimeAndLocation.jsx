import React from "react";
import { formatToLocalTime } from "../Services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  const localTime = formatToLocalTime(dt, timezone);
  const textShadow = { textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' };

  return (
    <div className="text-center my-6">
      <p className="text-white/70 text-base sm:text-lg font-light tracking-wider uppercase" style={textShadow}>
        {localTime}
      </p>
      <p className="text-4xl sm:text-5xl font-extrabold text-white mt-2 flex items-center justify-center gap-2" style={textShadow}>
        <span>📍</span>
        {`${name}, ${country}`}
      </p>
    </div>
  );
}

export default TimeAndLocation;