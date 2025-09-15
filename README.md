# WeatherNow - React Weather App

A **responsive weather forecast app** built with **React**, **Tailwind CSS**, and **card-based UI**. Fetches real-time weather data from **OpenWeatherMap API** and displays current weather and forecasts.

## Live App  
Access it here: [Weather Forecast App](https://weatherforecast-1-42dn.onrender.com)  

---

## Features

- Current weather: temperature, feels-like, humidity, wind speed, conditions  
- Hourly & daily forecast in card layout  
- Search by city or use current location  
- Toggle between Celsius (°C) and Fahrenheit (°F)  
- Dynamic background based on temperature  
- Mobile-responsive with smooth animations  

---

## Tech Stack

- React (hooks)  
- Tailwind CSS  
- Framer Motion  
- React Toastify  
- Luxon (time formatting)  
- OpenWeatherMap API  

---

## Installation

```bash
git clone https://github.com/shivamgupta6588/WeatherForecast.git
cd WeatherForecast
npm install
````

Create `.env`:

```env
REACT_APP_API_KEY=your_api_key
REACT_APP_API_URL=https://api.openweathermap.org/data/2.5
```

Start the app:

```bash
npm start
```

---

## Project Structure

```
src/
 ├─ components/ (Forecast, Inputs, TemperatureDetails, TimeAndLocation, TopButtons)
 ├─ Services/weatherService.js
 └─ App.jsx
```

---

## Optimization

* Cached API calls to reduce network requests
* Graceful error handling with toast notifications
* Reusable, responsive components
* Smooth animations with Framer Motion

---