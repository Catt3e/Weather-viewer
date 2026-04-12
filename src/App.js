import './App.css';
import SearchBar from './components/searchBar';
import CurrentWeather from './components/currentWeather';
import Forecast from './components/forecast';
import UseWeather from './hooks/useWeather';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const { weatherData, forecastData, loading, error } = UseWeather(city);

  const handleSearch = (cityName) => {
    setCity(cityName);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      
      {/* Header */}
      <header className="text-center py-8 px-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-tight">
          Weather Viewer
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Real-time weather information at your fingertips.
        </p>
      </header>

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
            <CurrentWeather weatherData={weatherData} />
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