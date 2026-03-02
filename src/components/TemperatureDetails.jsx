import React from "react";
import {
  UilTemperature,
  UilArrowUp,
  UilArrowDown,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilEye,
  UilCloud,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../Services/weatherService";

function TemperatureDetails({
  weather: {
    temp,
    feels_like,
    details,
    description,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    timezone,
    icon,
    humidity,
    wind_speed,
    visibility,
    cloudiness,
  },
}) {
  const getCardColor = () => {
    if (temp <= 15) return "from-cyan-600 to-blue-700";
    if (temp >= 30) return "from-orange-500 to-red-600";
    return "from-green-400 to-teal-500";
  };

  const textShadow = { textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' };
  const visibilityKm = visibility ? (visibility / 1000).toFixed(1) : "N/A";

  return (
    <div className="my-3 space-y-4">
      {/* Weather description badge */}
      <div className="flex items-center justify-center gap-3">
        <span className="bg-white/20 backdrop-blur-sm px-5 py-1.5 rounded-full text-lg text-white font-semibold capitalize shadow" style={textShadow}>
          {description || details}
        </span>
      </div>

      {/* Main temperature card */}
      <div
        className={`bg-gradient-to-br ${getCardColor()} rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-around text-white space-y-6 sm:space-y-0`}
      >
        <div className="flex flex-col items-center gap-1">
          <img src={iconUrlFromCode(icon)} alt="Weather Icon" className="w-28 h-28 drop-shadow-lg" />
          <p className="text-sm font-light opacity-80">{details}</p>
        </div>

        <p className="text-7xl font-extrabold tracking-tight" style={textShadow}>{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 items-start">
          <div className="flex font-light text-base items-center">
            <UilTemperature size={20} className="mr-2 opacity-80" />
            Feels Like: <span className="font-semibold ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilTear size={20} className="mr-2 opacity-80" />
            Humidity: <span className="font-semibold ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilWind size={20} className="mr-2 opacity-80" />
            Wind: <span className="font-semibold ml-1">{`${wind_speed.toFixed()} km/h`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilEye size={20} className="mr-2 opacity-80" />
            Visibility: <span className="font-semibold ml-1">{`${visibilityKm} km`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilCloud size={20} className="mr-2 opacity-80" />
            Cloudiness: <span className="font-semibold ml-1">{`${cloudiness}%`}</span>
          </div>
        </div>
      </div>

      {/* Sunrise, sunset, high and low */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <UilSun size={22} />, label: "Sunrise", value: formatToLocalTime(sunrise, timezone, "hh:mm a") },
          { icon: <UilSunset size={22} />, label: "Sunset", value: formatToLocalTime(sunset, timezone, "hh:mm a") },
          { icon: <UilArrowUp size={22} />, label: "High", value: `${temp_max.toFixed()}°` },
          { icon: <UilArrowDown size={22} />, label: "Low", value: `${temp_min.toFixed()}°` },
        ].map(({ icon: iconEl, label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl py-3 px-4 shadow text-white gap-1"
            style={textShadow}
          >
            <div className="text-cyan-300">{iconEl}</div>
            <p className="text-xs uppercase tracking-wide opacity-70">{label}</p>
            <p className="font-semibold text-base">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemperatureDetails;