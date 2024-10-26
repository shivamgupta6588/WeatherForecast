import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureDetails from "./components/TemperatureDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedData from "./Services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

function App() {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);

      try {
        setLoading(true);
        const data = await getFormattedData({ ...query, units });
        console.log("Fetched Weather Data:", data);

        if (data) {
          setWeather(data);
        } else {
          toast.error("Failed to fetch weather data.");
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        toast.error("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query, units]);

  const FormatBackground = () => {
    if (!weather) return "from-cyan-800 to-blue-900";
    const thre = units === "metric" ? 20 : 60;

    if (weather.temp <= thre) return "from-cyan-600 to-blue-700";
    if (weather.details === "Smoke") return "from-gray-600 to-gray-800";
    return "from-yellow-500 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md my-4 px-5 md:px-10 lg:px-20 bg-gradient-to-br ${FormatBackground()} min-h-screen flex flex-col justify-between rounded-2xl shadow-xl`}
      style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="text-white space-y-6">
        <TopButtons setQuery={setQuery} />
        <Inputs
          query={query}
          units={units}
          setUnits={setUnits}
          setQuery={setQuery}
        />

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-70"></div>
          </div>
        ) : (
          weather && (
            <div className="space-y-6">
              <TimeAndLocation weather={weather} />
              <TemperatureDetails weather={weather} />

              <div className="py-4 space-y-4">
                <Forecast title="Forecast" forecast={weather.forecast} />
              </div>
            </div>
          )
        )}
      </div>

      <ToastContainer
        position="top-left"
        theme="dark"
        newestOnTop={true}
        autoClose={2000}
        closeOnClick
        draggable
      />
    </div>
  );
}

export default App;
