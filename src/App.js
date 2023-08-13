import { useEffect, useState } from 'react';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureDetails from './components/TemperatureDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedData from './Services/weatherService.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: 'delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';
      toast.info('Fetching weather for ' + message);
      
      try {
        const data = await getFormattedData({ ...query, units });
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, [query, units]);

  const FormatBackground = () => {
    if (!weather) return 'from-cyan-800 to-blue-800';
    const thre = units === 'metric' ? 20 : 60;
    
    if (weather.temp <= thre) return 'from-cyan-700 to-blue-700';
    
    return 'from-yellow-700 to-orange-700';
  };

  return (
    <div className={`mx-auto max-w-screen-md max-sm:max-w-screen-sm md:my-4 px-5 md:px-10 lg:px-20 bg-gradient-to-br ${FormatBackground()} min-h-screen flex flex-col justify-between`}>
      <div >
        <TopButtons setQuery={setQuery} />
        <Inputs query={query} units={units} setUnits={setUnits} setQuery={setQuery} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureDetails weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="Daily forecast" items={weather.daily} />
          </div>
        )}
      </div>

      <ToastContainer
        position="top-left"
        theme="colored"
        newestOnTop={true}
        autoClose={2000}
        closeOnClick={true}
        draggable={true}
      />
    </div>
  );
}

export default App;
