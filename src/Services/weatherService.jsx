import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${infoType} data: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      pressure,
      sea_level,
      grnd_level,
    },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed, deg, gust },
    clouds: { all: cloudiness },
    visibility,
    rain,
  } = data;

  const { main: details, description, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    sea_level,
    grnd_level,
    visibility,
    cloudiness,
    rain: rain ? rain["1h"] : 0,
    wind_speed: speed,
    wind_deg: deg,
    wind_gust: gust,
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
  return data.list.slice(0, 40).map((d) => {
    return {
      title: formatToLocalTime(d.dt, data.city.timezone, "ccc, hh:mm a"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time :'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getFormattedData = async (searchParams) => {
  const currentWeatherData = await getWeatherData("weather", searchParams);
  const formattedCurrentWeather = formatCurrentWeather(currentWeatherData);

  const forecastWeatherData = await getWeatherData("forecast", {
    lat: formattedCurrentWeather.lat,
    lon: formattedCurrentWeather.lon,
    units: searchParams.units,
  });
  const formattedForecast = formatForecastWeather(forecastWeatherData);

  return {
    ...formattedCurrentWeather,
    forecast: formattedForecast,
  };
};

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedData;
export { formatToLocalTime, iconUrlFromCode };
