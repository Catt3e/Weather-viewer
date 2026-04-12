function CurrentWeather({ weatherData }) {
    if (!weatherData) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-400">
                Loading...
            </div>
        );
    }

    const { name, main, weather, wind } = weatherData;

    return (
        <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-lg p-6 max-w-sm mx-auto border border-gray-800">
            {/* City */}
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>

            {/* Weather + icon */}
            <div className="flex items-center justify-between mb-4">
                <p className="capitalize text-gray-300">
                    {weather[0].description}
                </p>
                <img
                    className="w-12 h-12"
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].description}
                />
            </div>

            {/* Temperature */}
            <div className="mb-4">
                <p className="text-4xl font-bold">
                    {Math.round(main.temp)}°C
                </p>
            </div>

            {/* Extra info */}
            <div className="flex justify-between text-sm text-gray-400 border-t border-gray-800 pt-4">
                <p>Wind: {wind.speed} m/s</p>
                <p>Feels like: {Math.round(main.feels_like)}°C</p>
            </div>
        </div>
    );
}

export default CurrentWeather;