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
    wind_speed, // Updated to match API response
  },
}) {
  return (
    <div>
      {/* Weather description */}
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Main temperature and weather details */}
      <div className="flex max-sm:flex-col max-sm:space-y-3 flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="Weather Icon" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels Like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind Speed:
            <span className="font-medium ml-1">{`${wind_speed.toFixed()} km/hr`}</span>
          </div>
        </div>
      </div>

      {/* Sunrise, sunset, high, and low temperatures */}
      <div className="flex max-sm:flex-wrap flex-row items-center justify-center space-x-2 space-y-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureDetails;
