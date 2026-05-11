import './App.css';
import SearchBar from './components/searchBar';
import CurrentWeather from './components/currentWeather';
import Forecast from './components/forecast';
import useWeather from './hooks/useWeather';
import { useState } from 'react';
import MapView from './components/mapView';
import { getCityNameByCoords } from './services/weatherAPI';
import toast, { Toaster } from 'react-hot-toast';
import useWeatherCoord from './hooks/useWeatherCoord';

function App() {
  const [city, setCity] = useState('Ho Chi Minh City');
  const [currentCity, setCurrentCity] = useState(null);
  
  const cityWeather = useWeather(city);
  const coordWeather = useWeatherCoord(
    currentCity?.coord?.lat || '',
    currentCity?.coord?.lon || ''
  );

  const currentWeather = coordWeather.weatherData ? coordWeather.weatherData : cityWeather.weatherData;
  const forecastData = coordWeather.forecastData ? coordWeather.forecastData : cityWeather.forecastData;
  const loading = coordWeather.loading || cityWeather.loading;
  const error = coordWeather.error || cityWeather.error;

  const handleSearch = (cityName) => {
    setCurrentCity(null);
    setCity(cityName);
  };

  const handleLocationSelect = async (lat, lon) => {
    setCurrentCity({ coord: { lat, lon } });

    try {
      await getCityNameByCoords(lat, lon);
    } catch (error) {
      toast.error("Failed to fetch city name for selected location.");
      console.error('Error fetching city name:', error);
    }
  };
    

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="text-center py-8 px-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-tight">
          Weather Viewer
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Real-time weather information at your fingertips.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <MapView 
          onLocationSelect={handleLocationSelect} 
          currentCity={currentCity}
        />
      </div>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error / Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading data...</p>
        )}
        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Current Weather */}
          <div className="lg:col-span-1">
            <CurrentWeather weatherData={currentWeather} />
          </div>

          {/* Right: Forecast */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 max-h-[600px] overflow-y-auto">
              <Forecast forecastData={forecastData} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;