import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

// Simple in-memory cache to prevent repeated API calls for same params
const cache = {};

const getWeatherData = async (infoType, searchParams) => {
  const key = `${infoType}-${JSON.stringify(searchParams)}`;
  if (cache[key]) return cache[key];

  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `Error fetching ${infoType}: ${response.status}`;
      console.error(`API Error: ${errorMessage}`, {
        status: response.status,
        url: url.toString(),
      });
      throw new Error(errorMessage);
    }
    const data = await response.json();
    cache[key] = data;
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for ${infoType}:`, error);
    throw error;
  }
};

/**
 * Format current weather API response
 */
const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat } = {},
    main: { temp, feels_like, temp_min, temp_max, humidity } = {},
    name,
    dt,
    sys: { country, sunrise, sunset } = {},
    weather,
    wind: { speed: wind_speed } = {},
    clouds: { all: cloudiness } = {},
    visibility,
    rain,
  } = data || {};

  const { main: details, description, icon } = weather?.[0] || {};

  return {
    lat: lat ?? 0,
    lon: lon ?? 0,
    temp: temp ?? 0,
    feels_like: feels_like ?? 0,
    temp_min: temp_min ?? 0,
    temp_max: temp_max ?? 0,
    humidity: humidity ?? 0,
    visibility: visibility ?? 0,
    cloudiness: cloudiness ?? 0,
    rain: rain?.["1h"] || 0,
    wind_speed: wind_speed ?? 0,
    name: name || "Unknown Location",
    country: country || "N/A",
    sunrise: sunrise ?? 0,
    sunset: sunset ?? 0,
    details: details || "N/A",
    description: description || "No description available",
    icon: icon || "01d",
    dt: dt ?? 0,
  };
};

/**
 * Format forecast weather API response
 */
const formatForecastWeather = (data) => {
  return (
    data?.list?.slice(0, 40).map((d) => ({
      title: formatToLocalTime(
        d.dt,
        data.city?.timezone,
        "ccc, dd LLL | hh:mm a"
      ),
      temp: d.main?.temp ?? 0,
      icon: d.weather?.[0]?.icon || "01d",
    })) || []
  );
};

/**
 * Convert Unix timestamp to local time string
 */
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy | hh:mm a"
) => {
  if (!zone) {
    console.warn("⚠️ Timezone not provided. Using UTC.");
    zone = "UTC";
  }

  const seconds = Number(secs);
  if (isNaN(seconds)) {
    console.error(`❌ Invalid timestamp: ${secs}`);
    return "Invalid Time";
  }

  try {
    return DateTime.fromSeconds(seconds).setZone(zone).toFormat(format);
  } catch (error) {
    console.error("❌ Luxon formatting error:", { secs, zone, format, error });
    return "Error formatting time";
  }
};

/**
 * Build weather icon URL
 */
const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code || "01d"}@2x.png`;

/**
 * Fetch & format weather data (current + forecast)
 */
const getFormattedData = async (searchParams) => {
  try {
    const currentWeatherData = await getWeatherData("weather", searchParams);
    const formattedCurrentWeather = formatCurrentWeather(currentWeatherData);

    const forecastWeatherData = await getWeatherData("forecast", {
      lat: formattedCurrentWeather.lat,
      lon: formattedCurrentWeather.lon,
      units: searchParams.units,
    });

    const formattedForecast = formatForecastWeather(forecastWeatherData);

    return { ...formattedCurrentWeather, forecast: formattedForecast };
  } catch (err) {
    console.error("Failed to fetch formatted weather data:", err);
    throw err;
  }
};

export default getFormattedData;
export { formatToLocalTime, iconUrlFromCode };
