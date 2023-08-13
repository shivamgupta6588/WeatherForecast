import { DateTime } from 'luxon'; // Import the necessary date library
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const formatCurrentWeather = (data) => {
    console.log(data);
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
        dt,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time :'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getFormattedData = async (searchParams) => {
    const currentWeatherData = await getWeatherData('weather', searchParams);
    const formattedCurrentWeather = formatCurrentWeather(currentWeatherData);

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat: formattedCurrentWeather.lat,
        lon: formattedCurrentWeather.lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units,
    });

    const formattedForecast = formatForecastWeather(formattedForecastWeather);

    return {
        ...formattedCurrentWeather,
        ...formattedForecast,
    };
};

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedData;
export { formatToLocalTime, iconUrlFromCode };
