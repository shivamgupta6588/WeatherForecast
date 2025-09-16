import React from "react";
import {
  UilTemperature,
  UilArrowUp,
  UilArrowDown,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../Services/weatherService";

function TemperatureDetails({
  weather: {
    temp,
    feels_like,
    details,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    timezone,
    icon,
    humidity,
    wind_speed,
  },
}) {
  // Card color remains dynamic based on temperature
  const getCardColor = () => {
    if (temp <= 15) return "from-cyan-600 to-blue-700";
    if (temp >= 30) return "from-orange-500 to-red-600";
    return "from-green-400 to-teal-500";
  };

  const textShadow = { textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' };

  return (
    <div className="my-3">
      {/* Weather description */}
      <div className="flex items-center justify-center py-6 text-xl text-cyan-200 font-semibold" style={textShadow}>
        {details}
      </div>

      {/* Main temperature and weather details */}
      <div
        className={`bg-gradient-to-br ${getCardColor()} rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-around text-white space-y-6 sm:space-y-0`}
      >
        <div className="flex flex-col items-center">
          <img src={iconUrlFromCode(icon)} alt="Weather Icon" className="w-24 h-24" />
        </div>
        
        <p className="text-6xl font-bold" style={textShadow}>{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 items-start">
          <div className="flex font-light text-base items-center">
            <UilTemperature size={20} className="mr-2" />
            Feels Like: <span className="font-semibold ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilTear size={20} className="mr-2" />
            Humidity: <span className="font-semibold ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-base items-center">
            <UilWind size={20} className="mr-2" />
            Wind: <span className="font-semibold ml-1">{`${wind_speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      {/* Sunrise, sunset, high and low */}
      <div className="flex flex-wrap items-center justify-center sm:justify-around space-x-4 space-y-2 text-white text-base py-4 mt-4 bg-black/20 backdrop-blur-sm rounded-full shadow-lg" style={textShadow}>
        <div className="flex items-center space-x-2">
          <UilSun />
          <p>Rise: <span>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
        </div>
        
        <div className="flex items-center space-x-2">
          <UilSunset />
          <p>Set: <span>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
        </div>
        
        <div className="flex items-center space-x-2">
          <UilArrowUp />
          <p>High: <span>{`${temp_max.toFixed()}°`}</span></p>
        </div>
        
        <div className="flex items-center space-x-2">
          <UilArrowDown />
          <p>Low: <span>{`${temp_min.toFixed()}°`}</span></p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureDetails;