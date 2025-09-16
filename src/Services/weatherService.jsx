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

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${infoType}: ${response.status}`);
  }
  const data = await response.json();
  cache[key] = data;
  return data;
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed: wind_speed } = {},
    clouds: { all: cloudiness } = {},
    visibility,
    rain,
  } = data;

  const { main: details, description, icon } = weather?.[0] || {};

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    visibility,
    cloudiness,
    rain: rain?.["1h"] || 0,
    wind_speed,
    name,
    country,
    sunrise,
    sunset,
    details,
    description,
    icon,
    dt,
  };
};

const formatForecastWeather = (data) => {
  return data?.list?.slice(0, 40).map((d) => ({
    title: formatToLocalTime(d.dt, data.city.timezone, "ccc, hh:mm a"),
    temp: d.main.temp,
    icon: d.weather?.[0]?.icon,
  })) || [];
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy | Local time: hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

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
